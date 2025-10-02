import { RedditScraper } from './reddit';
import { HackerNewsScraper } from './hackernews';
import { RSScraper } from './rss';
import { Article, ScrapingResult } from '../../shared/types';
import { config } from '../../shared/config';
import { IScraperAdapter } from './interfaces';

export class MasterScraper {
  private scrapers: IScraperAdapter[];

  constructor() {
    this.scrapers = [
      new RedditScraper(),
      new HackerNewsScraper(),
      new RSScraper()
    ];
  }

  async scrapeAll(): Promise<ScrapingResult> {
    console.log('Starting comprehensive scraping session...');
    const startTime = Date.now();

    const allArticles: Article[] = [];
    const errors: string[] = [];

    // Use adapter pattern for all scrapers
    for (const scraper of this.scrapers) {
      if (!scraper.isEnabled()) {
        console.log(`${scraper.name} is disabled, skipping...`);
        continue;
      }

      try {
        console.log(`Scraping with ${scraper.name}...`);
        const articles = await scraper.scrapeAll();
        allArticles.push(...articles);
        console.log(`${scraper.name}: Found ${articles.length} articles`);
      } catch (error) {
        const errorMsg = `${scraper.name} scraping failed: ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    // Remove duplicates and apply filters
    const filteredArticles = await this.filterAndDeduplicate(allArticles);

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(`Scraping completed in ${duration}s`);
    console.log(`Total articles found: ${allArticles.length}`);
    console.log(`After filtering: ${filteredArticles.length}`);

    return {
      articles: filteredArticles,
      errors,
      totalProcessed: allArticles.length
    };
  }

  private async filterAndDeduplicate(articles: Article[]): Promise<Article[]> {
    const filters = config.getConfig('filters') as any;
    const filtered: Article[] = [];
    const seenTitles = new Set<string>();

    for (const article of articles) {
      // Skip if duplicate title (simple deduplication)
      const normalizedTitle = article.title.toLowerCase().trim();
      if (seenTitles.has(normalizedTitle)) {
        continue;
      }
      seenTitles.add(normalizedTitle);

      // Apply quality filters
      if (!this.passesQualityFilter(article, filters)) {
        continue;
      }

      filtered.push(article);
    }

    // Sort by score descending
    return filtered.sort((a, b) => b.score - a.score);
  }

  private passesQualityFilter(article: Article, filters: any): boolean {
    // Check minimum engagement thresholds
    const minEngagement = filters.qualityThresholds.minimumEngagement[article.sourceType];
    if (minEngagement && article.score < minEngagement) {
      return false;
    }

    // Check content length
    if (article.content.length < filters.qualityThresholds.minimumContentLength) {
      return false;
    }

    // Check age
    const hoursOld = (Date.now() - article.publishedAt.getTime()) / (1000 * 60 * 60);
    if (hoursOld > filters.qualityThresholds.maximumAge) {
      return false;
    }

    // Check for excluded keywords
    const titleAndContent = `${article.title} ${article.content}`.toLowerCase();
    for (const keyword of filters.contentFilters.excludeKeywords) {
      if (titleAndContent.includes(keyword.toLowerCase())) {
        return false;
      }
    }

    // Check for required keywords (at least one category must match)
    const requireKeywords = filters.contentFilters.requireKeywords;

    // Check if any category has matching keywords
    for (const category in requireKeywords) {
      const keywords = requireKeywords[category];
      const hasMatch = keywords.some((keyword: string) =>
        titleAndContent.includes(keyword.toLowerCase())
      );
      if (hasMatch) return true;
    }

    return false;
  }
}

// Re-export individual scrapers for backward compatibility
export { RedditScraper, HackerNewsScraper, RSScraper };