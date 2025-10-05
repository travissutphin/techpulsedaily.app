import fs from 'fs';
import path from 'path';
import { Article } from './types';
import { QueueManager } from './storage/queue';
import { config } from './utils/config';
import { PathResolver } from './shared/paths';

export class Publisher {
  private queue: QueueManager;
  private contentDir: string;

  constructor() {
    this.queue = new QueueManager();
    this.contentDir = PathResolver.postsDir;
    this.ensureContentDir();
  }

  private ensureContentDir(): void {
    if (!fs.existsSync(this.contentDir)) {
      fs.mkdirSync(this.contentDir, { recursive: true });
    }
  }

  async publishApprovedArticles(): Promise<{published: number, errors: string[]}> {
    const approvedArticles = await this.queue.getApprovedArticles();
    const siteConfig = config.getConfig('site') as any as any;
    
    let published = 0;
    const errors: string[] = [];

    console.log(`Publishing ${approvedArticles.length} approved articles...`);

    for (const article of approvedArticles) {
      try {
        const postContent = this.generatePostContent(article, siteConfig);
        const filename = this.generateFilename(article);
        const filepath = path.join(this.contentDir, filename);

        fs.writeFileSync(filepath, postContent);
        
        // Mark as published in queue
        await this.queue.markAsPublished(article.id);
        
        published++;
        console.log(`Published: ${article.title}`);
      } catch (error) {
        const errorMsg = `Failed to publish ${article.title}: ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    // Generate index and sitemap
    await this.generateIndex();
    await this.generateSitemap();

    return { published, errors };
  }

  private generatePostContent(article: Article, siteConfig: any): string {
    const publishDate = new Date().toISOString();
    const slug = this.generateSlug(article.title);
    
    // Generate schema markup
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.summary || article.title,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": siteConfig.site.name,
        "url": siteConfig.site.url
      },
      "datePublished": article.publishedAt,
      "dateModified": publishDate,
      "url": `${siteConfig.site.url}/posts/${slug}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteConfig.site.url}/posts/${slug}`
      }
    };

    // Generate FAQ schema if available
    let faqSchema = '';
    if (article.faq && article.faq.length > 0) {
      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      };
      faqSchema = `\n<script type="application/ld+json">\n${JSON.stringify(faqData, null, 2)}\n</script>`;
    }

    return `---
title: "${article.title.replace(/"/g, '\\"')}"
description: "${(article.summary || article.title).replace(/"/g, '\\"')}"
publishedAt: "${article.publishedAt}"
scrapedAt: "${article.scrapedAt}"
source: "${article.source}"
sourceType: "${article.sourceType}"
author: "${article.author}"
url: "${article.url}"
score: ${article.score}
qualityScore: ${article.qualityScore || 0}
tags: ${JSON.stringify(article.tags)}
slug: "${slug}"
---

<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>${faqSchema}

# ${article.title}

<div className="article-meta">
  <span className="source">Source: <a href="${article.url}" target="_blank" rel="noopener">${article.source}</a></span>
  <span className="date">Published: ${new Date(article.publishedAt).toLocaleDateString()}</span>
  <span className="quality">Quality Score: ${article.qualityScore?.toFixed(1)}/10</span>
</div>

## Summary

${article.summary || 'No summary available.'}

## Key Takeaways

${this.generateKeyTakeaways(article)}

## Tags

${article.tags.map(tag => `<span className="tag">#${tag}</span>`).join(' ')}

${article.faq && article.faq.length > 0 ? this.generateFAQSection(article.faq) : ''}

---

**Want to dive deeper?** [Read the full article](${article.url}) on ${article.source}.

**Found this useful?** Share it with your network and join the conversation about the latest in tech!
`;
  }

  private generateFAQSection(faq: Array<{question: string, answer: string}>): string {
    let faqContent = '\n## Frequently Asked Questions\n\n';
    
    faq.forEach((item, index) => {
      faqContent += `### ${item.question}\n\n${item.answer}\n\n`;
    });
    
    return faqContent;
  }

  private generateKeyTakeaways(article: Article): string {
    // Simple extraction of key points from summary
    const summary = article.summary || '';
    const sentences = summary.split(/[.!?]+/).filter(s => s.trim().length > 10);
    
    if (sentences.length <= 2) {
      return `- ${summary}`;
    }
    
    return sentences.slice(0, 3).map(sentence => `- ${sentence.trim()}`).join('\n');
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60);
  }

  private generateFilename(article: Article): string {
    const date = new Date().toISOString().split('T')[0];
    const slug = this.generateSlug(article.title);
    return `${date}-${slug}.mdx`;
  }

  private async generateIndex(): Promise<void> {
    const posts = this.getAllPosts();
    const siteConfig = config.getConfig('site') as any as any;
    
    const indexContent = `---
title: "${siteConfig.seo.defaultTitle}"
description: "${siteConfig.seo.defaultDescription}"
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${siteConfig.site.name}",
  "description": "${siteConfig.site.description}",
  "url": "${siteConfig.site.url}",
  "author": {
    "@type": "Organization",
    "name": "${siteConfig.site.author}"
  }
}
</script>

# ${siteConfig.site.name}

${siteConfig.site.description}

## Latest Tech News

${posts.slice(0, 10).map(post => `
### [${post.title}](posts/${post.slug})

${post.description}

*Published ${new Date(post.publishedAt).toLocaleDateString()} | Source: ${post.source} | Quality: ${post.qualityScore}/10*

---
`).join('')}

[View All Articles →](/archive)
`;

    const indexPath = path.join(PathResolver.contentDir, 'index.mdx');
    fs.writeFileSync(indexPath, indexContent);
  }

  private async generateSitemap(): Promise<void> {
    const posts = this.getAllPosts();
    const siteConfig = config.getConfig('site') as any as any;
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.site.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${siteConfig.site.url}/posts/${post.slug}</loc>
    <lastmod>${post.publishedAt.split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    const sitemapPath = path.join(PathResolver.publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
  }

  private getAllPosts(): any[] {
    const files = fs.readdirSync(this.contentDir);
    const posts = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const content = fs.readFileSync(path.join(this.contentDir, file), 'utf8');
        const frontmatter = this.parseFrontmatter(content);
        return frontmatter;
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return posts;
  }

  private parseFrontmatter(content: string): any {
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
}