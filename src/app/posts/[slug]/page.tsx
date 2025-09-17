import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { config } from '@/lib/utils/config';

interface PostData {
  title: string;
  description: string;
  publishedAt: string;
  source: string;
  sourceType: string;
  author: string;
  url: string;
  qualityScore: number;
  tags: string[];
  slug: string;
  content: string;
}

async function getPost(slug: string): Promise<PostData | null> {
  const contentDir = path.join(process.cwd(), 'content', 'posts');
  
  if (!fs.existsSync(contentDir)) {
    return null;
  }

  const files = fs.readdirSync(contentDir);
  const targetFile = files.find(file => {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const frontmatter = parseFrontmatter(content);
    return frontmatter.slug === slug;
  });

  if (!targetFile) {
    return null;
  }

  const content = fs.readFileSync(path.join(contentDir, targetFile), 'utf8');
  const frontmatter = parseFrontmatter(content);
  
  // Extract the markdown content (everything after the frontmatter)
  const contentMatch = content.match(/^---[\s\S]*?---\n([\s\S]*)$/);
  const markdownContent = contentMatch ? contentMatch[1] : '';

  return {
    ...frontmatter,
    content: markdownContent
  } as PostData;
}

function parseFrontmatter(content: string): any {
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
  
  return frontmatter;
}

function extractFullSummaryFromContent(content: string) {
  if (!content) return null;

  // Extract from ## Summary section
  const summaryMatch = content.match(/## Summary\s*\n([\s\S]*?)(?=\n##|$)/);
  if (summaryMatch) {
    const summaryContent = summaryMatch[1].trim();
    const sections = summaryContent.split(/\n\n/);

    return sections.map((section, index) => {
      const sectionText = section.trim();

      if (sectionText.startsWith('Key Takeaway:')) {
        const content = sectionText.replace('Key Takeaway:', '').trim();
        return (
          <div key={index} className="tp-key-takeaway mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-tp-text-primary">
              <i className="fas fa-lightbulb text-tp-primary"></i>
              Key Takeaway
            </h3>
            <p className="text-tp-text-secondary leading-relaxed">{content}</p>
          </div>
        );
      }

      if (sectionText.startsWith('Why it Matters:') || sectionText.startsWith('Why It Matters:')) {
        const content = sectionText.replace(/^Why [iI]t Matters:\s*/, '').trim();
        return (
          <div key={index} className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-lg mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-orange-400">
              <i className="fas fa-bullseye"></i>
              Why it Matters
            </h3>
            <p className="text-tp-text-secondary leading-relaxed">{content}</p>
          </div>
        );
      }

      if (sectionText.startsWith('Brief Context:')) {
        const content = sectionText.replace('Brief Context:', '').trim();
        return (
          <div key={index} className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-blue-400">
              <i className="fas fa-book"></i>
              Context
            </h3>
            <p className="text-tp-text-secondary leading-relaxed">{content}</p>
          </div>
        );
      }

      // Handle any other content that doesn't match the patterns above
      if (sectionText.length > 20) {
        return (
          <div key={index} className="bg-tp-surface/50 border border-tp-border p-4 rounded-lg mb-6">
            <p className="text-tp-text-secondary leading-relaxed">{sectionText}</p>
          </div>
        );
      }

      return null;
    }).filter(Boolean);
  }

  return null;
}

// Generate metadata for SEO and AEO optimization
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const siteConfig = config.getConfig('site') as any as any;

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }

  // Extract key takeaway for meta description
  const keyTakeaway = extractKeyTakeawayText(post.content);
  const metaDescription = keyTakeaway || post.description.substring(0, 160);
  
  // Create comprehensive keywords for AEO
  const keywords = [
    ...post.tags,
    'AI news',
    'tech news',
    'technology updates',
    'artificial intelligence',
    post.source.toLowerCase(),
    'tech analysis',
    'AI insights'
  ];

  const publishedDate = new Date(post.publishedAt);
  const modifiedDate = new Date();
  
  return {
    title: `${post.title} | ${siteConfig.site.name}`,
    description: metaDescription,
    keywords: keywords.join(', '),
    authors: [{ name: post.author }, { name: siteConfig.site.author }],
    publisher: siteConfig.site.name,
    creator: siteConfig.site.author,
    
    // Open Graph for social sharing
    openGraph: {
      title: post.title,
      description: metaDescription,
      url: `${siteConfig.site.url}/posts/${post.slug}`,
      siteName: siteConfig.site.name,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: modifiedDate.toISOString(),
      authors: [post.author],
      tags: post.tags,
      section: 'Technology',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: metaDescription,
      creator: `@${siteConfig.site.author.replace(/\s+/g, '')}`,
      site: `@${siteConfig.site.name.replace(/\s+/g, '')}`,
    },

    // Additional metadata for AEO
    alternates: {
      canonical: `${siteConfig.site.url}/posts/${post.slug}`,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Article-specific metadata
    other: {
      'article:author': post.author,
      'article:publisher': siteConfig.site.name,
      'article:published_time': post.publishedAt,
      'article:modified_time': modifiedDate.toISOString(),
      'article:section': 'Technology',
      'article:tag': post.tags.join(', '),
      
      // AEO-specific metadata
      'ai:summary': keyTakeaway || '',
      'content:quality_score': post.qualityScore?.toString(),
      'content:source': post.source,
      'content:reading_time': Math.ceil((post.content?.length || 0) / 200) + ' minutes',
    }
  };
}

// Helper function to extract just the key takeaway text
function extractKeyTakeawayText(content: string): string | null {
  if (!content) return null;
  
  const summaryMatch = content.match(/## Summary\s*\n([\s\S]*?)(?=\n##|$)/);
  if (summaryMatch) {
    const summaryContent = summaryMatch[1].trim();
    const keyTakeawayMatch = summaryContent.match(/Key Takeaway:\s*\n([\s\S]*?)(?=\n\n|$)/);
    if (keyTakeawayMatch) {
      return keyTakeawayMatch[1].trim();
    }
  }
  
  return null;
}

// Helper function to extract FAQs for structured data
function extractFAQs(content: string) {
  if (!content) return [];
  
  const faqMatch = content.match(/## Frequently Asked Questions\s*\n([\s\S]*?)(?=\n##|$)/);
  if (!faqMatch) return [];
  
  const faqContent = faqMatch[1];
  const faqs = [];
  const questionRegex = /### (.+?)\n\n([\s\S]+?)(?=\n\n###|\n\n---|\n\n\*\*|$)/g;
  
  let match;
  while ((match = questionRegex.exec(faqContent)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim().replace(/^nswer:\s*/, ''); // Remove "Answer:" prefix if present
    
    faqs.push({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    });
  }
  
  return faqs;
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'posts');
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const frontmatter = parseFrontmatter(content);
      return { slug: frontmatter.slug };
    })
    .filter(param => param.slug);
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const siteConfig = config.getConfig('site') as any as any;

  if (!post) {
    notFound();
  }

  const structuredContent = extractFullSummaryFromContent(post.content);
  const keyTakeaway = extractKeyTakeawayText(post.content);
  const readingTime = Math.ceil((post.content?.length || 0) / 200);

  // Enhanced JSON-LD structured data for AEO
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": keyTakeaway || post.description,
    "image": {
      "@type": "ImageObject",
      "url": `${siteConfig.site.url}/images/techpulsedaily-og.png`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": post.url
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.site.name,
      "url": siteConfig.site.url,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.site.url}/images/techpulsedaily.png`,
        "width": 232,
        "height": 232
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": new Date().toISOString(),
    "url": `${siteConfig.site.url}/posts/${post.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.site.url}/posts/${post.slug}`
    },
    "articleSection": "Technology",
    "keywords": post.tags.join(", "),
    "wordCount": post.content?.length || 0,
    "timeRequired": `PT${readingTime}M`,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "copyrightHolder": {
      "@type": "Organization",
      "name": siteConfig.site.name
    },
    "about": {
      "@type": "Thing",
      "name": post.tags[0] || "Technology",
      "description": keyTakeaway || post.description
    },
    "mentions": post.tags.map(tag => ({
      "@type": "Thing",
      "name": tag
    })),
    "genre": "Technology News",
    "educationalLevel": "Professional",
    "audience": {
      "@type": "Audience",
      "audienceType": "Technology Professionals"
    }
  };

  // FAQ structured data if available
  const faqStructuredData = post.content?.includes('## Frequently Asked Questions') ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": extractFAQs(post.content)
  } : null;

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.site.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tech News",
        "item": `${siteConfig.site.url}/#tech-news`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${siteConfig.site.url}/posts/${post.slug}`
      }
    ]
  };

  return (
    <>
      {/* Enhanced structured data for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData)
        }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData)
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />

    <div className="min-h-screen bg-tp-background">
      {/* Header */}
      <header className="tp-nav">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-tp-primary transition-colors text-tp-text-primary"
              >
                <i className="fas fa-arrow-left"></i>
                Back to {siteConfig.site.name}
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a href={`https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-tp-text-muted hover:text-tp-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={`https://linkedin.com/${siteConfig.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-tp-text-muted hover:text-tp-primary transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <article 
          className="tp-card p-8 tp-fade-in"
          itemScope 
          itemType="https://schema.org/Article"
        >
          {/* Article Header with AEO optimization */}
          <header className="mb-8">
            {/* Breadcrumb navigation for AEO */}
            <nav className="text-sm mb-4 text-tp-text-muted" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li><Link href="/" className="hover:text-tp-primary">Home</Link></li>
                <li className="text-tp-text-disabled">/</li>
                <li><span className="font-medium">Tech News</span></li>
                <li className="text-tp-text-disabled">/</li>
                <li className="font-medium truncate text-tp-text-secondary">{post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}</li>
              </ol>
            </nav>

            <h1 className="text-3xl font-bold mb-4 text-tp-text-primary" itemProp="headline">
              {post.title}
            </h1>

            {/* Key takeaway as subtitle for AEO */}
            {keyTakeaway && (
              <div className="tp-key-takeaway mb-6">
                <h4><i className="fas fa-lightbulb"></i> Key Insight</h4>
                <p itemProp="description">{keyTakeaway}</p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-tp-text-muted mb-6">
              <span itemProp="sourceOrganization">
                <i className="fas fa-globe"></i>
                {post.source}
              </span>
              <time dateTime={post.publishedAt} itemProp="datePublished">
                <i className="fas fa-calendar"></i>
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                <i className="fas fa-user"></i>
                <span itemProp="name">{post.author}</span>
              </span>
              {post.qualityScore >= 8 ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-tp-primary/20 text-tp-primary">
                  <i className="fas fa-star mr-1"></i>
                  High Quality
                </span>
              ) : post.qualityScore >= 6 ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400">
                  <i className="fas fa-star-half-alt mr-1"></i>
                  Medium
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-400">
                  <i className="fas fa-star mr-1"></i>
                  {post.qualityScore?.toFixed(1)}/10
                </span>
              )}
              <span className="tp-tag">
                <i className="fas fa-clock"></i>
                {readingTime} min read
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag) => (
                <span key={tag} className="tp-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Structured Content with AEO optimization */}
          <div className="mb-8" itemProp="articleBody">
            {/* Summary section optimized for AI understanding */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-tp-text-primary border-tp-border">
                <i className="fas fa-clipboard-list"></i> Complete Analysis
              </h2>
              {structuredContent}
              
              {/* Additional context for AI understanding */}
              <div className="mt-8 p-6 rounded-lg border bg-tp-surface border-tp-border">
                <h3 className="text-lg font-semibold mb-4 text-tp-text-primary">
                  <i className="fas fa-bullseye"></i> Why This Matters for Tech Professionals
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-tp-text-secondary">
                  <div>
                    <strong>Industry Impact:</strong> This development affects {post.tags.join(', ')} sectors
                  </div>
                  <div>
                    <strong>Quality Rating:</strong> {post.qualityScore?.toFixed(1)}/10 based on source credibility and relevance
                  </div>
                  <div>
                    <strong>Reading Time:</strong> {readingTime} minutes
                  </div>
                  <div>
                    <strong>Source:</strong> Originally reported by {post.source}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Read Full Article Button */}
          <div className="border-t pt-8 border-tp-border">
            <div className="text-center">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-btn-primary"
              >
                <i className="fas fa-external-link-alt"></i>
                Read Full Story on {post.source}
              </a>
              <p className="text-sm mt-2 text-tp-text-muted">
                Opens in a new tab
              </p>
            </div>
          </div>

          {/* Share Section */}
          <div className="border-t pt-6 mt-6 border-tp-border">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-3 text-tp-text-primary">
                <i className="fas fa-heart"></i> Found this useful?
              </h3>
              <p className="mb-4 text-tp-text-secondary">
                Share it with your network and join the conversation about the latest in tech!
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.site.url}/posts/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tp-text-muted hover:text-tp-primary transition-colors"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteConfig.site.url}/posts/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tp-text-muted hover:text-tp-primary transition-colors"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: ${siteConfig.site.url}/posts/${post.slug}`)}`}
                  className="text-tp-text-muted hover:text-tp-primary transition-colors"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="tp-nav border-t border-tp-border mt-24">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
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
            &copy; 2025 {siteConfig.site.name}. Quality tech news for busy professionals.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}