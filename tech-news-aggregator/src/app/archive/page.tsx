import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { config } from '@/lib/utils/config';

interface Post {
  title: string;
  description: string;
  publishedAt: string;
  source: string;
  sourceType: string;
  qualityScore: number;
  tags: string[];
  slug: string;
  content: string;
}

async function getAllPosts(): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), 'content', 'posts');

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
      return parsePostContent(content);
    })
    .filter(post => post.title) // Only include posts with valid frontmatter
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

function parsePostContent(fileContent: string): Post {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) return {} as Post;

  const frontmatterText = match[1];
  const frontmatter: any = {};

  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }

      if (!isNaN(Number(value)) && value !== '') {
        value = Number(value) as any;
      }

      frontmatter[key] = value;
    }
  });

  // Extract the markdown content (everything after the frontmatter)
  const contentMatch = fileContent.match(/^---[\s\S]*?---\n([\s\S]*)$/);
  const markdownContent = contentMatch ? contentMatch[1] : '';

  return {
    ...frontmatter,
    content: markdownContent
  } as Post;
}

function extractKeyTakeawayFromContent(content: string) {
  if (!content) return <p className="text-tp-text-muted">No summary available.</p>;

  // Extract from ## Summary section
  const summaryMatch = content.match(/## Summary\s*\n([\s\S]*?)(?=\n##|$)/);
  if (summaryMatch) {
    const summaryContent = summaryMatch[1].trim();

    // Look for "Key Takeaway:" at the start of a line
    const keyTakeawayMatch = summaryContent.match(/^Key Takeaway:\s*([\s\S]*?)(?=\n\n|Why [iI]t Matters:|Brief Context:|$)/);
    if (keyTakeawayMatch) {
      const keyTakeaway = keyTakeawayMatch[1].trim();
      const condensed = keyTakeaway.length > 350 ? keyTakeaway.substring(0, 350) + '...' : keyTakeaway;

      return (
        <div className="tp-key-takeaway">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-tp-text-primary">
            <i className="fas fa-lightbulb text-tp-primary"></i>
            Key Insight
          </h4>
          <p className="font-medium text-sm leading-relaxed">{condensed}</p>
        </div>
      );
    }

    // Look for "Why it Matters:" or "Why It Matters:" section
    const whyMattersMatch = summaryContent.match(/^Why [iI]t Matters:\s*([\s\S]*?)(?=\n\n|Key Takeaway:|Brief Context:|$)/);
    if (whyMattersMatch) {
      const insight = whyMattersMatch[1].trim();
      const formatted = insight.length > 350 ? insight.substring(0, 350) + '...' : insight;

      return (
        <div className="bg-orange-500/10 border-l-4 border-orange-500 p-3 rounded-r-lg">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-orange-400">
            <i className="fas fa-bullseye"></i>
            Why it Matters
          </h4>
          <p className="text-tp-text-secondary font-medium text-sm leading-relaxed">{formatted}</p>
        </div>
      );
    }

    // Look for "Brief Context:" section
    const contextMatch = summaryContent.match(/^Brief Context:\s*([\s\S]*?)(?=\n\n|Key Takeaway:|Why [iI]t Matters:|$)/);
    if (contextMatch) {
      const context = contextMatch[1].trim();
      const formatted = context.length > 350 ? context.substring(0, 350) + '...' : context;

      return (
        <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded-r-lg">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-blue-400">
            <i className="fas fa-book"></i>
            Context
          </h4>
          <p className="text-tp-text-secondary font-medium text-sm leading-relaxed">{formatted}</p>
        </div>
      );
    }

    // Fall back to first substantive paragraph from summary
    const paragraphs = summaryContent.split(/\n\n+/).filter(p => p.trim().length > 50);
    if (paragraphs.length > 0) {
      const substantiveContent = paragraphs[0].trim();
      // Remove any section headers
      const cleanContent = substantiveContent.replace(/^(Key Takeaway|Why [iI]t Matters|Brief Context):\s*/i, '');
      const formatted = cleanContent.length > 350 ? cleanContent.substring(0, 350) + '...' : cleanContent;

      return (
        <div className="bg-tp-primary/10 border-l-4 border-tp-primary p-3 rounded-r-lg">
          <p className="text-tp-text-secondary font-medium text-sm leading-relaxed">{formatted}</p>
        </div>
      );
    }
  }

  // Fallback to description if no summary found
  return <p className="text-tp-text-muted text-sm">Click to read the full analysis.</p>;
}

function getSourceCode(source: string) {
  const sourceLower = source.toLowerCase();

  // Known sources with 2-letter codes
  if (sourceLower.includes('reddit') || sourceLower.startsWith('r/')) {
    return 'R/';
  }
  if (sourceLower.includes('techcrunch')) {
    return 'TC';
  }
  if (sourceLower.includes('mit') || sourceLower.includes('technology review')) {
    return 'MI';
  }
  if (sourceLower.includes('hacker news') || sourceLower.includes('ycombinator')) {
    return 'HN';
  }
  if (sourceLower.includes('github')) {
    return 'GH';
  }
  if (sourceLower.includes('twitter') || sourceLower.includes('x.com')) {
    return 'TW';
  }
  if (sourceLower.includes('linkedin')) {
    return 'LI';
  }
  if (sourceLower.includes('openai')) {
    return 'AI';
  }
  if (sourceLower.includes('google')) {
    return 'GO';
  }
  if (sourceLower.includes('microsoft')) {
    return 'MS';
  }
  if (sourceLower.includes('arxiv')) {
    return 'AR';
  }
  if (sourceLower.includes('medium')) {
    return 'ME';
  }
  if (sourceLower.includes('wired')) {
    return 'WI';
  }
  if (sourceLower.includes('ars technica')) {
    return 'AT';
  }

  // Fallback - use first 2 characters
  return source.substring(0, 2).toUpperCase();
}

export default async function ArchivePage() {
  const posts = await getAllPosts();
  const siteConfig = config.getConfig('site') as any as any;

  return (
    <div className="min-h-screen bg-tp-background">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-tp-primary hover:text-tp-primary-light transition-colors mb-4">
            <i className="fas fa-arrow-left"></i>
            Back to Latest News
          </Link>
          <h1 className="text-3xl font-bold text-tp-text-primary mb-2">Article Archive</h1>
          <p className="text-tp-text-secondary">Browse all {posts.length} articles from TechPulse Daily</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-newspaper text-6xl mb-6 text-tp-text-disabled"></i>
            <h2 className="text-2xl font-semibold mb-4 text-tp-text-secondary">No articles found</h2>
            <p className="text-tp-text-muted">Check back soon for archived tech news!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <article key={post.slug} className="tp-card transition-all hover:transform hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 mr-3">
                      <h2 className="text-lg font-semibold mb-2 text-tp-text-primary">
                        <Link
                          href={`/posts/${post.slug}`}
                          className="hover:text-tp-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tp-surface border border-tp-border" title={`Source: ${post.source}`}>
                      <span className="text-tp-primary font-bold text-xs">
                        {getSourceCode(post.source)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    {extractKeyTakeawayFromContent(post.content)}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="tp-tag text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-tp-text-muted mb-4">
                    <span className="flex items-center">
                      <i className="fas fa-globe mr-1 text-xs"></i>
                      {post.source}
                    </span>
                    <span className="flex items-center">
                      <i className="fas fa-calendar mr-1 text-xs"></i>
                      {new Date(post.publishedAt).toLocaleDateString('en-US')}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-tp-border">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="tp-btn-primary w-full justify-center"
                    >
                      <i className="fas fa-arrow-right mr-2"></i>
                      Read the Gist
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}