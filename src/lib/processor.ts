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
    const TIMEOUT_MS = 120000; // 2 minutes - enough for Claude processing but prevents infinite hangs

    try {
      // Wrap entire process in timeout
      const processPromise = this.doScrapingCycle();
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Scraping timeout - took longer than 25s')), TIMEOUT_MS)
      );

      return await Promise.race([processPromise, timeoutPromise]);
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

  private async doScrapingCycle(): Promise<{
    scraped: number;
    processed: number;
    queued: number;
    errors: string[];
  }> {
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

      // Step 3: Filter and queue articles (single pass)
      console.log('Step 3: Filtering and queueing articles...');

      const qualityArticles = processedArticles.filter(article => {
        // Quality check
        if (!article.qualityScore || article.qualityScore < 6) {
          return false;
        }

        // Keyword check (inline)
        const filterConfig = config.getConfig<any>('filters');
        const requireKeywords = filterConfig?.contentFilters?.requireKeywords || {};

        if (Object.keys(requireKeywords).length > 0) {
          const searchText = `${article.title} ${article.summary || ''}`.toLowerCase();
          let hasRequired = false;

          for (const category in requireKeywords) {
            if (requireKeywords[category].some((kw: string) => searchText.includes(kw.toLowerCase()))) {
              hasRequired = true;
              break;
            }
          }

          if (!hasRequired) return false;
        }

        return true;
      });

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
      console.error('Error in scraping cycle:', error);
      return {
        scraped: 0,
        processed: 0,
        queued: 0,
        errors: [`Scraping cycle error: ${error}`]
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

  // Removed - filtering now inline in runScrapingCycle() for efficiency

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}