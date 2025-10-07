import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { PathResolver } from '@/lib/shared/paths';

// Use dynamic rendering to avoid ISR cache from Docker build (before volume mount)
// ISR pre-renders with 0 articles during Docker build, then serves stale cache even after MDX files exist
export const dynamic = 'force-dynamic';

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

async function getPosts(): Promise<Post[]> {
  const contentDir = PathResolver.postsDir;

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

async function getRecentPosts(): Promise<Post[]> {
  const allPosts = await getPosts();

  // Use a fixed reference date to ensure consistent server/client rendering
  // This gets the posts from the last 7 days based on the most recent post
  if (allPosts.length === 0) return [];

  const mostRecentPost = new Date(allPosts[0].publishedAt);
  const cutoffDate = new Date(mostRecentPost);
  cutoffDate.setDate(cutoffDate.getDate() - 7);

  const recentPosts = allPosts.filter(post => {
    const postDate = new Date(post.publishedAt);
    return postDate >= cutoffDate;
  });

  // Remove duplicates by slug, keeping the most recent one
  const uniquePosts = recentPosts.reduce((acc: Post[], post: Post) => {
    const existingPost = acc.find(p => p.slug === post.slug);
    if (!existingPost) {
      acc.push(post);
    } else {
      // Keep the more recent post
      const currentDate = new Date(post.publishedAt);
      const existingDate = new Date(existingPost.publishedAt);
      if (currentDate > existingDate) {
        const index = acc.findIndex(p => p.slug === post.slug);
        acc[index] = post;
      }
    }
    return acc;
  }, []);

  return uniquePosts;
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

    // Look for "Key Takeaway:" anywhere in the summary (not just at start of line)
    const keyTakeawayMatch = summaryContent.match(/Key Takeaway:\s*([\s\S]*?)(?=\n\n|Why [iI]t Matters:|Brief Context:|$)/m);
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

    // Look for "Why it Matters:" or "Why It Matters:" section (anywhere in summary)
    const whyMattersMatch = summaryContent.match(/Why [iI]t Matters:\s*([\s\S]*?)(?=\n\n|Key Takeaway:|Brief Context:|$)/m);
    if (whyMattersMatch) {
      const insight = whyMattersMatch[1].trim();
      const formatted = insight.length > 350 ? insight.substring(0, 350) + '...' : insight;

      return (
        <div className="tp-key-takeaway">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-tp-text-primary">
            <i className="fas fa-lightbulb text-tp-primary"></i>
            Key Insight
          </h4>
          <p className="font-medium text-sm leading-relaxed">{formatted}</p>
        </div>
      );
    }

    // Look for "Brief Context:" section (anywhere in summary)
    const contextMatch = summaryContent.match(/Brief Context:\s*([\s\S]*?)(?=\n\n|Key Takeaway:|Why [iI]t Matters:|$)/m);
    if (contextMatch) {
      const context = contextMatch[1].trim();
      const formatted = context.length > 350 ? context.substring(0, 350) + '...' : context;

      return (
        <div className="tp-key-takeaway">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-tp-text-primary">
            <i className="fas fa-lightbulb text-tp-primary"></i>
            Key Insight
          </h4>
          <p className="font-medium text-sm leading-relaxed">{formatted}</p>
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
        <div className="tp-key-takeaway">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-tp-text-primary">
            <i className="fas fa-lightbulb text-tp-primary"></i>
            Key Insight
          </h4>
          <p className="font-medium text-sm leading-relaxed">{formatted}</p>
        </div>
      );
    }
  }

  // Fallback - no summary found
  return (
    <div className="tp-key-takeaway">
      <h4 className="flex items-center gap-2 text-sm font-semibold mb-2 text-tp-text-primary">
        <i className="fas fa-lightbulb text-tp-primary"></i>
        Key Insight
      </h4>
      <p className="font-medium text-sm leading-relaxed text-tp-text-muted">Click to read the full analysis.</p>
    </div>
  );
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


export default async function HomePage() {
  const posts = await getRecentPosts();

  // Use environment variable for site config to avoid file system reads in dynamic mode
  const siteConfig = {
    site: {
      name: 'TechPulse Daily',
      url: process.env.SITE_URL || 'https://techpulsedaily.app'
    }
  };

  return (
    <div className="min-h-screen bg-tp-background">
      {/* Header */}
      

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-newspaper text-6xl mb-6 text-tp-text-disabled"></i>
            <h2 className="text-2xl font-semibold mb-4 text-tp-text-secondary">No articles published yet</h2>
            <p className="text-tp-text-muted">Check back soon for the latest AI-curated tech news!</p>
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

        {posts.length > 0 && (
          <div className="mt-16 text-center">
            <Link
              href="/archive"
              className="tp-btn-danger"
            >
              <i className="fas fa-archive mr-2"></i>
              View Article Archive
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="tp-nav border-t border-tp-border mt-24">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 text-center md:text-left">
            <div className="md:col-span-4">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <img
                  src="/images/techpulsedaily.png"
                  alt="TechPulse Daily Logo"
                  className="tp-logo"
                />
                <div>
                  <h3 className="font-bold text-tp-text-primary">
                    {siteConfig.site.name}
                  </h3>
                  <p className="text-sm text-tp-text-secondary">
                    AI-Curated Tech News
                  </p>
                </div>
              </div>
              <p className="text-sm text-tp-text-muted">
                Quality tech news for busy professionals. Get insights for meaningful conversations.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-tp-text-primary">
                Quick Links
              </h4>
              <div className="space-y-2">
                <Link href="/" className="block text-sm hover:text-tp-primary transition-colors text-tp-text-muted">
                  Latest News
                </Link>
                <Link href="/archive" className="block text-sm hover:text-tp-primary transition-colors text-tp-text-muted">
                  Article Archive
                </Link>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-tp-text-primary">
                Connect
              </h4>
              <div className="flex justify-center md:justify-start gap-3 mb-4">
                <a href="https://linkedin.com/travis-sutphin-4472a1a/" target="_blank" rel="noopener noreferrer" className="text-tp-text-muted hover:text-tp-primary transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://reddit.com/r/travissutphin/" target="_blank" rel="noopener noreferrer" className="text-tp-text-muted hover:text-tp-primary transition-colors">
                  <i className="fab fa-reddit"></i>
                </a>
                <a href="https://travissutphin.com" target="_blank" rel="noopener noreferrer" className="text-tp-text-muted hover:text-tp-primary transition-colors">
                  <i className="fas fa-globe"></i>
                </a>
                <a href="https://github.com/travissutphin?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-tp-text-muted hover:text-tp-primary transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
              <p className="text-xs text-tp-text-disabled">
                &copy; 2025 {siteConfig.site.name}
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-tp-text-primary">
                Legal
              </h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-sm hover:text-tp-primary transition-colors text-tp-text-muted">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-sm hover:text-tp-primary transition-colors text-tp-text-muted">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="block text-sm hover:text-tp-primary transition-colors text-tp-text-muted">
                  Cookie Policy
                </Link>
                <Link href="/disclaimer" className="block text-sm hover:text-tp-primary transition-colors text-tp-text-muted">
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
