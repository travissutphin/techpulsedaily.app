import { Article } from '../../shared/types';
import { config } from '../../shared/config';
import { IScraperAdapter } from './interfaces';

interface HNItem {
  id: number;
  title: string;
  url?: string;
  text?: string;
  by: string;
  time: number;
  score: number;
  descendants?: number;
}

export class HackerNewsScraper implements IScraperAdapter {
  name = 'HackerNewsScraper';
  private baseUrl = 'https://hacker-news.firebaseio.com/v0';

  async scrapeAll(): Promise<Article[]> {
    return this.scrapeTopStories();
  }

  async scrapeTopStories(): Promise<Article[]> {
    try {
      const sources = config.getConfig('sources') as any;
      const hnConfig = sources.hackernews;

      if (!hnConfig.enabled) {
        return [];
      }

      // Get top story IDs
      const topStoriesResponse = await fetch(`${this.baseUrl}/topstories.json`);
      const storyIds: number[] = await topStoriesResponse.json();

      // Limit to first 30 stories for processing
      const limitedIds = storyIds.slice(0, 30);
      const articles: Article[] = [];

      for (const id of limitedIds) {
        try {
          const storyResponse = await fetch(`${this.baseUrl}/item/${id}.json`);
          const story: HNItem = await storyResponse.json();

          // Skip if score is too low
          if (story.score < hnConfig.minScore) continue;

          // Skip if too old (maxAge in hours)
          const hoursOld = (Date.now() - story.time * 1000) / (1000 * 60 * 60);
          if (hoursOld > hnConfig.maxAge) continue;

          // Skip if no URL (Ask HN, Show HN without links)
          if (!story.url) continue;

          const article: Article = {
            id: `hn_${story.id}`,
            title: story.title,
            content: story.text || story.url,
            url: story.url,
            source: 'Hacker News',
            sourceType: 'hackernews',
            author: story.by,
            publishedAt: new Date(story.time * 1000),
            scrapedAt: new Date(),
            score: story.score * hnConfig.weight,
            engagement: {
              upvotes: story.score,
              comments: story.descendants || 0
            },
            tags: this.extractTags(story.title, story.text || ''),
          };

          articles.push(article);
        } catch (error) {
          console.error(`Error fetching HN story ${id}:`, error);
        }

        // Rate limiting
        await this.delay(100);
      }

      return articles;
    } catch (error) {
      console.error('Error scraping Hacker News:', error);
      return [];
    }
  }

  isEnabled(): boolean {
    const sources = config.getConfig('sources') as any;
    return sources.hackernews?.enabled || false;
  }

  private extractTags(title: string, content: string): string[] {
    const text = `${title} ${content || ''}`.toLowerCase();
    const tags: string[] = [];

    const techKeywords = [
      'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
      'neural network', 'gpt', 'llm', 'chatgpt', 'claude', 'openai', 'google',
      'microsoft', 'apple', 'tech', 'startup', 'software', 'hardware',
      'programming', 'development', 'javascript', 'python', 'react', 'node',
      'blockchain', 'crypto', 'web3', 'saas', 'api', 'database', 'security'
    ];

    for (const keyword of techKeywords) {
      if (text.includes(keyword)) {
        tags.push(keyword);
      }
    }

    return [...new Set(tags)];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}