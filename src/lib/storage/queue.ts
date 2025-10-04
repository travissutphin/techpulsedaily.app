import fs from 'fs';
import path from 'path';
import { Article } from '../types';
import { PathResolver } from '../shared/paths';

export class QueueManager {
  private baseDir = PathResolver.queueDir;

  constructor() {
    this.ensureDirectories();
  }

  private ensureDirectories(): void {
    const dirs = ['pending', 'approved', 'rejected'];
    dirs.forEach(dir => {
      const fullPath = path.join(this.baseDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });
  }

  async addToPending(articles: Article[]): Promise<void> {
    for (const article of articles) {
      // Check if article already exists in ANY queue or published
      if (await this.articleExists(article.url)) {
        console.log(`Skipping duplicate article: ${article.title}`);
        continue;
      }

      const filename = `${article.id}_${Date.now()}.json`;
      const filepath = path.join(this.baseDir, 'pending', filename);

      try {
        fs.writeFileSync(filepath, JSON.stringify(article, null, 2));
        console.log(`Added article to pending queue: ${article.title}`);
      } catch (error) {
        console.error(`Failed to save article ${article.id}:`, error);
      }
    }
  }

  // Check if article exists anywhere in the system by URL
  private async articleExists(url: string): Promise<boolean> {
    const queues = ['pending', 'approved', 'rejected'];

    // Check all queue directories
    for (const queue of queues) {
      const queueDir = path.join(this.baseDir, queue);
      if (!fs.existsSync(queueDir)) continue;

      const files = fs.readdirSync(queueDir);
      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        try {
          const filepath = path.join(queueDir, file);
          const content = fs.readFileSync(filepath, 'utf8');
          const article: Article = JSON.parse(content);

          if (article.url === url) {
            return true; // Found duplicate
          }
        } catch (error) {
          // Skip corrupted files
        }
      }
    }

    // Check published articles
    const contentDir = PathResolver.postsDir;
    if (fs.existsSync(contentDir)) {
      const files = fs.readdirSync(contentDir);
      for (const file of files) {
        if (!file.endsWith('.mdx')) continue;

        try {
          const filepath = path.join(contentDir, file);
          const content = fs.readFileSync(filepath, 'utf8');
          const frontmatter = this.parseMDXFrontmatter(content);

          if (frontmatter.url === url) {
            return true; // Found duplicate
          }
        } catch (error) {
          // Skip corrupted files
        }
      }
    }

    return false; // No duplicate found
  }

  async getPendingArticles(): Promise<Article[]> {
    const pendingDir = path.join(this.baseDir, 'pending');
    const files = fs.readdirSync(pendingDir);
    const articles: Article[] = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const filepath = path.join(pendingDir, file);
          const content = fs.readFileSync(filepath, 'utf8');
          const article: Article = JSON.parse(content);
          // Add unique file-based ID to prevent React key collisions
          article.id = file.replace('.json', '');
          articles.push(article);
        } catch (error) {
          console.error(`Failed to read article ${file}:`, error);
        }
      }
    }

    // Sort by quality score descending, then by score
    return articles.sort((a, b) => {
      const aScore = (a.qualityScore || 0) * 10 + a.score;
      const bScore = (b.qualityScore || 0) * 10 + b.score;
      return bScore - aScore;
    });
  }

  async approveArticle(articleId: string): Promise<boolean> {
    return this.moveArticle(articleId, 'pending', 'approved');
  }

  async rejectArticle(articleId: string): Promise<boolean> {
    return this.moveArticle(articleId, 'pending', 'rejected');
  }

  async getApprovedArticles(): Promise<Article[]> {
    return this.getArticlesFromQueue('approved');
  }

  async markAsPublished(articleId: string): Promise<boolean> {
    try {
      // Check if article is already published to prevent duplicates
      const approvedDir = path.join(this.baseDir, 'approved');
      const approvedFiles = fs.readdirSync(approvedDir);
      const targetFile = approvedFiles.find(file => file === `${articleId}.json`);

      if (!targetFile) {
        console.error(`Article ${articleId} not found in approved queue`);
        return false;
      }

      const sourcePath = path.join(approvedDir, targetFile);
      const articleContent = fs.readFileSync(sourcePath, 'utf8');
      const article: Article = JSON.parse(articleContent);

      // Check if already published
      const existsInPublished = await this.articleExists(article.url);
      if (existsInPublished) {
        // Clean up the approved copy since it's already published
        fs.unlinkSync(sourcePath);
        console.log(`Removed duplicate approved article: ${article.title}`);
        return true;
      }

      // Archive the published article for record keeping
      const archiveDir = path.join(this.baseDir, '..', 'published');
      if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
      }

      const archivePath = path.join(archiveDir, targetFile);
      fs.renameSync(sourcePath, archivePath);
      console.log(`Archived published article: ${article.title}`);
      return true;
    } catch (error) {
      console.error(`Failed to mark article ${articleId} as published:`, error);
      return false;
    }
  }

  private async moveArticle(articleId: string, fromQueue: string, toQueue: string): Promise<boolean> {
    try {
      const fromDir = path.join(this.baseDir, fromQueue);
      const toDir = path.join(this.baseDir, toQueue);
      
      const files = fs.readdirSync(fromDir);
      // The articleId is actually the full filename without .json, so we need to add .json back
      const targetFile = files.find(file => file === `${articleId}.json`);
      
      if (!targetFile) {
        console.error(`Article ${articleId} not found in ${fromQueue} queue`);
        console.error(`Available files:`, files);
        return false;
      }
      
      const sourcePath = path.join(fromDir, targetFile);
      const destPath = path.join(toDir, targetFile);
      
      fs.renameSync(sourcePath, destPath);
      console.log(`Moved article ${articleId} from ${fromQueue} to ${toQueue}`);
      return true;
    } catch (error) {
      console.error(`Failed to move article ${articleId}:`, error);
      return false;
    }
  }

  private async getArticlesFromQueue(queueName: string): Promise<Article[]> {
    const queueDir = path.join(this.baseDir, queueName);
    const files = fs.readdirSync(queueDir);
    const articles: Article[] = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const filepath = path.join(queueDir, file);
          const content = fs.readFileSync(filepath, 'utf8');
          const article: Article = JSON.parse(content);
          // Add unique file-based ID to prevent React key collisions
          article.id = file.replace('.json', '');
          articles.push(article);
        } catch (error) {
          console.error(`Failed to read article ${file}:`, error);
        }
      }
    }

    return articles.sort((a, b) => new Date(b.scrapedAt).getTime() - new Date(a.scrapedAt).getTime());
  }

  async getPublishedArticles(): Promise<Article[]> {
    // Get all published articles from the content/posts directory (actual live articles)
    const contentDir = PathResolver.postsDir;
    if (!fs.existsSync(contentDir)) {
      return [];
    }
    
    const files = fs.readdirSync(contentDir);
    const articles: Article[] = [];

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        try {
          const filepath = path.join(contentDir, file);
          const content = fs.readFileSync(filepath, 'utf8');
          const frontmatter = this.parseMDXFrontmatter(content);
          
          // Convert frontmatter to Article format
          const article: Article = {
            id: frontmatter.slug || file.replace('.mdx', ''),
            title: frontmatter.title || 'Untitled',
            summary: frontmatter.description || '',
            publishedAt: frontmatter.publishedAt || new Date().toISOString(),
            scrapedAt: frontmatter.scrapedAt || frontmatter.publishedAt || new Date().toISOString(),
            source: frontmatter.source || 'Unknown',
            sourceType: frontmatter.sourceType || 'unknown',
            author: frontmatter.author || 'Unknown',
            url: frontmatter.url || '',
            score: frontmatter.score || 0,
            qualityScore: frontmatter.qualityScore || 0,
            tags: frontmatter.tags || [],
            content: '',
            engagement: { upvotes: 0, shares: 0, comments: 0 }
          };
          
          articles.push(article);
        } catch (error) {
          console.error(`Failed to read published article ${file}:`, error);
        }
      }
    }

    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  private parseMDXFrontmatter(content: string): any {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    
    if (!match) return {};
    
    const frontmatterText = match[1];
    const frontmatter: any = {};
    
    frontmatterText.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        
        // Remove quotes
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // Parse JSON arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // Keep as string if parsing fails
          }
        }
        
        // Parse numbers
        if (!isNaN(Number(value)) && value !== '') {
          value = Number(value) as any;
        }
        
        frontmatter[key] = value;
      }
    });
    
    return frontmatter;
  }

  async getQueueStats(): Promise<{pending: number, approved: number, rejected: number, published: number}> {
    const stats = {
      pending: 0,
      approved: 0,
      rejected: 0,
      published: 0
    };

    try {
      const dirs = ['pending', 'approved', 'rejected'] as const;
      
      for (const dir of dirs) {
        const queueDir = path.join(this.baseDir, dir);
        if (fs.existsSync(queueDir)) {
          const files = fs.readdirSync(queueDir);
          stats[dir] = files.filter(file => file.endsWith('.json')).length;
        }
      }

      // Count published articles from content/posts directory
      const contentDir = PathResolver.postsDir;
      if (fs.existsSync(contentDir)) {
        const files = fs.readdirSync(contentDir);
        stats.published = files.filter(file => file.endsWith('.mdx')).length;
      }
    } catch (error) {
      console.error('Failed to get queue stats:', error);
    }

    return stats;
  }

  async cleanupOldEntries(retentionDays: number = 30): Promise<void> {
    const dirs = ['pending', 'approved', 'rejected'];
    const cutoffTime = Date.now() - (retentionDays * 24 * 60 * 60 * 1000);

    for (const dir of dirs) {
      const queueDir = path.join(this.baseDir, dir);
      if (!fs.existsSync(queueDir)) continue;

      const files = fs.readdirSync(queueDir);
      
      for (const file of files) {
        if (!file.endsWith('.json')) continue;
        
        const filepath = path.join(queueDir, file);
        const stats = fs.statSync(filepath);
        
        if (stats.mtime.getTime() < cutoffTime) {
          fs.unlinkSync(filepath);
          console.log(`Cleaned up old file: ${file}`);
        }
      }
    }
  }
}