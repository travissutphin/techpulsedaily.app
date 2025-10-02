import { Article } from '../../shared/types';
import { config } from '../../shared/config';
import { IScraperAdapter } from './interfaces';

export class RedditScraper implements IScraperAdapter {
  name = 'RedditScraper';
  private baseUrl = 'https://www.reddit.com/r';

  async scrapeSubreddit(subredditName: string, minScore: number = 25): Promise<Article[]> {
    try {
      const url = `${this.baseUrl}/${subredditName}/hot.json?limit=25`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'TechPulse-Aggregator/1.0'
        }
      });

      if (response.status === 429) {
        console.warn(`Rate limit hit for r/${subredditName}, backing off...`);
        await this.delay(5000);
        return [];
      }

      if (response.status === 503) {
        console.warn(`Reddit service unavailable for r/${subredditName}`);
        return [];
      }

      if (!response.ok) {
        throw new Error(`Reddit API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const posts = data.data.children;

      const articles: Article[] = [];

      for (const post of posts) {
        const postData = post.data;

        // Skip if score is too low
        if (postData.score < minScore) continue;

        // Skip if it's a self post without URL
        if (postData.is_self && !postData.selftext) continue;

        const article: Article = {
          id: `reddit_${postData.id}`,
          title: postData.title,
          content: postData.selftext || postData.url,
          url: postData.url,
          source: `r/${subredditName}`,
          sourceType: 'reddit',
          author: postData.author,
          publishedAt: new Date(postData.created_utc * 1000),
          scrapedAt: new Date(),
          score: postData.score,
          engagement: {
            upvotes: postData.ups,
            comments: postData.num_comments
          },
          tags: this.extractTags(postData.title, postData.selftext || ''),
        };

        articles.push(article);
      }

      return articles;
    } catch (error) {
      console.error(`Error scraping r/${subredditName}:`, error);
      return [];
    }
  }

  async scrapeAll(): Promise<Article[]> {
    const sources = config.getConfig('sources') as any;
    const redditConfig = sources.reddit;

    if (!redditConfig.enabled) {
      return [];
    }

    const allArticles: Article[] = [];

    for (const subreddit of redditConfig.subreddits) {
      console.log(`Scraping r/${subreddit.name}...`);
      const articles = await this.scrapeSubreddit(subreddit.name, subreddit.minScore);

      // Apply weight to scores
      const weightedArticles = articles.map(article => ({
        ...article,
        score: article.score * subreddit.weight
      }));

      allArticles.push(...weightedArticles);

      // Rate limiting
      await this.delay(1000);
    }

    return allArticles;
  }

  isEnabled(): boolean {
    const sources = config.getConfig('sources') as any;
    return sources.reddit?.enabled || false;
  }

  private extractTags(title: string, content: string): string[] {
    const text = `${title} ${content}`.toLowerCase();
    const tags: string[] = [];

    // Tech keywords
    const techKeywords = [
      'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
      'neural network', 'gpt', 'llm', 'chatgpt', 'claude', 'openai', 'google',
      'microsoft', 'apple', 'tech', 'startup', 'software', 'hardware',
      'programming', 'development', 'javascript', 'python', 'react', 'node'
    ];

    for (const keyword of techKeywords) {
      if (text.includes(keyword)) {
        tags.push(keyword);
      }
    }

    return [...new Set(tags)]; // Remove duplicates
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}