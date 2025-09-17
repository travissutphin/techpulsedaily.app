// Application-wide constants

// Content limits
export const MAX_ARTICLE_LENGTH = 10000;
export const MIN_ARTICLE_LENGTH = 100;
export const MAX_TITLE_LENGTH = 200;
export const MAX_SUMMARY_LENGTH = 500;

// Scoring thresholds
export const MIN_QUALITY_SCORE = 6;
export const MIN_REDDIT_SCORE = 50;
export const MIN_HN_SCORE = 50;

// Time constants
export const HOURS_IN_DAY = 24;
export const MAX_AGE_HOURS = 48;
export const CACHE_TTL_HOURS = 24;
export const SESSION_TIMEOUT_SECONDS = 3600;

// Pagination
export const ARTICLES_PER_PAGE = 10;
export const MAX_QUEUE_DISPLAY = 50;

// File paths
export const CONTENT_DIR = 'content/posts';
export const QUEUE_DIR = 'data/queue';
export const PUBLISHED_DIR = 'data/published';
export const CONFIG_DIR = 'config';

// Source types
export const SOURCE_TYPES = {
  REDDIT: 'reddit' as const,
  HACKERNEWS: 'hackernews' as const,
  RSS: 'rss' as const
};

// Queue status
export const QUEUE_STATUS = {
  PENDING: 'pending' as const,
  APPROVED: 'approved' as const,
  REJECTED: 'rejected' as const,
  PUBLISHED: 'published' as const
};

// Default timezone
export const DEFAULT_TIMEZONE = 'America/New_York';

// API endpoints
export const API_ROUTES = {
  SCRAPE: '/api/scrape',
  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_LOGOUT: '/api/admin/logout',
  ADMIN_ARTICLES: '/api/admin/articles',
  ADMIN_PUBLISH: '/api/admin/publish',
  ADMIN_STATS: '/api/admin/stats'
};

// Error messages
export const ERROR_MESSAGES = {
  CONFIG_NOT_FOUND: 'Configuration file not found',
  INVALID_API_KEY: 'Invalid API key',
  SESSION_EXPIRED: 'Session has expired',
  UNAUTHORIZED: 'Unauthorized access',
  ARTICLE_NOT_FOUND: 'Article not found',
  SCRAPING_FAILED: 'Scraping operation failed'
};