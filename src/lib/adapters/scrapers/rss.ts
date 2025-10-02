import Parser from 'rss-parser';
import { Article } from '../../shared/types';
import { config } from '../../shared/config';
import { IScraperAdapter } from './interfaces';

export class RSScraper implements IScraperAdapter {
  name = 'RSScraper';
  private parser: Parser;

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: ['pubDate', 'description', 'content:encoded']
      }
    });
  }

  async scrapeFeed(feedUrl: string, feedName: string, weight: number = 1.0): Promise<Article[]> {
    try {
      console.log(`Scraping RSS feed: ${feedName}`);
      const feed = await this.parser.parseURL(feedUrl);

      if (!feed || !feed.items) {
        console.warn(`No items found in RSS feed: ${feedName}`);
        return [];
      }

      const articles: Article[] = [];

      for (const item of feed.items || []) {
        if (!item.title || !item.link) continue;

        // Skip if too old (48 hours)
        const publishedDate = new Date(item.pubDate || item.isoDate || Date.now());
        const hoursOld = (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60);
        if (hoursOld > 48) continue;

        const article: Article = {
          id: `rss_${this.generateId(item.link)}`,
          title: item.title,
          content: item['content:encoded'] || item.description || item.content || '',
          url: item.link,
          source: feedName,
          sourceType: 'rss',
          author: item.creator || item.author || feedName,
          publishedAt: publishedDate,
          scrapedAt: new Date(),
          score: this.calculateRSSScore(item, weight),
          engagement: {
            shares: 0 // RSS doesn't provide engagement metrics
          },
          tags: this.extractTags(item.title, item.description || ''),
        };

        articles.push(article);
      }

      return articles;
    } catch (error) {
      console.error(`Error scraping RSS feed ${feedName}:`, error);
      return [];
    }
  }

  async scrapeAll(): Promise<Article[]> {
    const sources = config.getConfig('sources') as any;
    const rssFeeds = sources.rssFeeds;

    const allArticles: Article[] = [];

    for (const feed of rssFeeds) {
      if (!feed.enabled) continue;

      const articles = await this.scrapeFeed(feed.url, feed.name, feed.weight);
      allArticles.push(...articles);

      // Rate limiting
      await this.delay(2000);
    }

    return allArticles;
  }

  isEnabled(): boolean {
    const sources = config.getConfig('sources') as any;
    return sources.rssFeeds?.some((feed: any) => feed.enabled) || false;
  }

  private calculateRSSScore(item: any, weight: number): number {
    // Base score for RSS items (since they don't have upvotes/engagement)
    let score = 50;

    // Boost score based on source reliability
    const filters = config.getConfig('filters') as any;
    const trustedSources = filters.sourceReliability.trusted;

    if (item.link && trustedSources.some((domain: string) => item.link.includes(domain))) {
      score += 30;
    }

    // Apply weight
    return score * weight;
  }

  private extractTags(title: string, description: string): string[] {
    const text = `${title} ${description || ''}`.toLowerCase();
    const tags: string[] = [];

    const techKeywords = [
      'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
      'neural network', 'gpt', 'llm', 'chatgpt', 'claude', 'openai', 'google',
      'microsoft', 'apple', 'tech', 'startup', 'software', 'hardware',
      'programming', 'development', 'javascript', 'python', 'react', 'node',
      'blockchain', 'crypto', 'web3', 'saas', 'api', 'database', 'security',
      'cloud', 'aws', 'azure', 'devops', 'mobile', 'ios', 'android'
    ];

    for (const keyword of techKeywords) {
      if (text.includes(keyword)) {
        tags.push(keyword);
      }
    }

    return [...new Set(tags)];
  }

  private generateId(url: string): string {
    return url.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}