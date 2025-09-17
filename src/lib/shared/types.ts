export interface Article {
  id: string;
  title: string;
  content: string;
  summary?: string;
  url: string;
  source: string;
  sourceType: 'reddit' | 'hackernews' | 'rss';
  author: string;
  publishedAt: Date;
  scrapedAt: Date;
  score: number;
  engagement: {
    upvotes?: number;
    comments?: number;
    shares?: number;
  };
  tags: string[];
  qualityScore?: number;
  isApproved?: boolean;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface ScrapingSource {
  name: string;
  type: 'reddit' | 'hackernews' | 'rss';
  config: any;
  weight: number;
  enabled: boolean;
}

export interface QualityAssessment {
  score: number;
  reasoning: string;
  isRecommended: boolean;
}

export interface ClaudeResponse {
  qualityAssessment?: QualityAssessment;
  summary?: string;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  isDuplicate?: boolean;
}

export interface ScrapingResult {
  articles: Article[];
  errors: string[];
  totalProcessed: number;
}