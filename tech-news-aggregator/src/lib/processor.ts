import { MasterScraper } from './scrapers';
import { ClaudeClient } from './claude/client';
import { QueueManager } from './storage/queue';
import { Article, ScrapingResult } from './types';
import { config } from './utils/config';

export class ContentProcessor {
  private scraper: MasterScraper;
  private claude: ClaudeClient;
  private queue: QueueManager;

  constructor() {
    this.scraper = new MasterScraper();
    this.claude = new ClaudeClient();
    this.queue = new QueueManager();
  }

  async runScrapingCycle(): Promise<{
    scraped: number;
    processed: number;
    queued: number;
    errors: string[];
  }> {
    console.log('=== Starting Content Processing Cycle ===');
    
    // Clear config cache to ensure we get latest filter settings
    config.clearAllCache();
    
    const startTime = Date.now();

    try {
      // Step 1: Scrape content from all sources
      console.log('Step 1: Scraping content...');
      const scrapingResult: ScrapingResult = await this.scraper.scrapeAll();
      
      if (scrapingResult.articles.length === 0) {
        console.log('No articles found during scraping');
        return {
          scraped: 0,
          processed: 0,
          queued: 0,
          errors: scrapingResult.errors
        };
      }

      // Step 2: Process articles through Claude
      console.log(`Step 2: Processing ${scrapingResult.articles.length} articles with Claude...`);
      const processedArticles: Article[] = [];
      const batchSize = 3; // Process in batches to avoid rate limits
      
      for (let i = 0; i < scrapingResult.articles.length; i += batchSize) {
        const batch = scrapingResult.articles.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(scrapingResult.articles.length/batchSize)}`);
        
        const batchPromises = batch.map(article => this.claude.processArticle(article));
        const batchResults = await Promise.allSettled(batchPromises);
        
        batchResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            processedArticles.push(result.value);
          } else {
            console.error(`Failed to process article: ${batch[index].title}`, result.reason);
            scrapingResult.errors.push(`Processing failed for: ${batch[index].title}`);
          }
        });

        // Rate limiting between batches
        if (i + batchSize < scrapingResult.articles.length) {
          await this.delay(2000);
        }
      }

      // Step 3: Filter for quality and keywords, then add to queue
      console.log('Step 3: Filtering and queueing articles...');
      
      // First filter by keywords
      const keywordFilteredArticles = this.filterByKeywords(processedArticles);
      
      // Then filter by quality
      const qualityArticles = keywordFilteredArticles.filter(article => 
        article.qualityScore && article.qualityScore >= 6
      );

      if (qualityArticles.length > 0) {
        await this.queue.addToPending(qualityArticles);
      }

      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;

      const summary = {
        scraped: scrapingResult.articles.length,
        processed: processedArticles.length,
        queued: qualityArticles.length,
        errors: scrapingResult.errors
      };

      console.log(`=== Processing Cycle Complete (${duration}s) ===`);
      console.log(`Scraped: ${summary.scraped} articles`);
      console.log(`Processed: ${summary.processed} articles`);
      console.log(`Queued for approval: ${summary.queued} articles`);
      console.log(`Errors: ${summary.errors.length}`);

      return summary;
    } catch (error) {
      console.error('Fatal error during processing cycle:', error);
      return {
        scraped: 0,
        processed: 0,
        queued: 0,
        errors: [`Fatal processing error: ${error}`]
      };
    }
  }

  async getProcessingStats(): Promise<{
    queueStats: {pending: number, approved: number, rejected: number};
    lastRun?: Date;
    nextRun?: Date;
  }> {
    const queueStats = await this.queue.getQueueStats();
    
    // You could store last/next run times in a simple JSON file or database
    return {
      queueStats,
      lastRun: new Date(), // Placeholder - implement proper tracking
      nextRun: new Date(Date.now() + 6 * 60 * 60 * 1000) // Next 6-hour cycle
    };
  }

  async duplicateCheck(articles: Article[]): Promise<Article[]> {
    console.log('Running duplicate detection...');
    const uniqueArticles: Article[] = [];
    
    for (const article of articles) {
      let isDuplicate = false;
      
      for (const existing of uniqueArticles) {
        const duplicateCheck = await this.claude.checkDuplicate(article, existing);
        
        if (duplicateCheck.isDuplicate) {
          console.log(`Duplicate detected: ${article.title} similar to ${existing.title}`);
          isDuplicate = true;
          break;
        }
      }
      
      if (!isDuplicate) {
        uniqueArticles.push(article);
      }
    }
    
    console.log(`Removed ${articles.length - uniqueArticles.length} duplicates`);
    return uniqueArticles;
  }

  private filterByKeywords(articles: Article[]): Article[] {
    try {
      const filterConfig = config.getConfig<any>('filters');
      const excludeKeywords = filterConfig?.contentFilters?.excludeKeywords || [];
      const requireKeywords = filterConfig?.contentFilters?.requireKeywords || {};
      
      const filteredArticles = articles.filter(article => {
        const searchText = `${article.title} ${article.summary || ''}`.toLowerCase();
        
        // First check: Does it contain required keywords?
        let hasRequiredKeyword = false;
        if (Object.keys(requireKeywords).length > 0) {
          // Check if article contains any keyword from any category (ai OR tech)
          for (const category in requireKeywords) {
            const keywords = requireKeywords[category];
            const hasKeywordFromCategory = keywords.some((keyword: string) => 
              searchText.includes(keyword.toLowerCase())
            );
            if (hasKeywordFromCategory) {
              hasRequiredKeyword = true;
              break;
            }
          }
          
          if (!hasRequiredKeyword) {
            console.log(`Filtered out article: "${article.title}" - missing required keywords`);
            return false;
          }
        }
        
        // Second check: Does it contain excluded keywords?
        if (excludeKeywords.length > 0) {
          const hasExcludedKeyword = excludeKeywords.some((keyword: string) => 
            searchText.includes(keyword.toLowerCase())
          );
          
          if (hasExcludedKeyword) {
            console.log(`Filtered out article: "${article.title}" - contains excluded keyword`);
            return false;
          }
        }
        
        return true;
      });

      const filtered = articles.length - filteredArticles.length;
      if (filtered > 0) {
        console.log(`Filtered out ${filtered} articles based on keyword filters`);
        console.log(`Kept ${filteredArticles.length} articles that match required keywords and avoid excluded keywords`);
      }
      
      return filteredArticles;
    } catch (error) {
      console.error('Error applying keyword filters:', error);
      return articles; // Return unfiltered articles if filter config fails
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}