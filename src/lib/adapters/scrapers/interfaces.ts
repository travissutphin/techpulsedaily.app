// Scraper adapter interfaces - defines contracts for all scrapers

import { Article } from '../../shared/types';

export interface IScraperAdapter {
  name: string;
  scrapeAll(): Promise<Article[]>;
  isEnabled(): boolean;
}

export interface IRedditScraperConfig {
  subreddits: Array<{
    name: string;
    minScore: number;
    weight: number;
  }>;
  enabled: boolean;
}

export interface IHackerNewsScraperConfig {
  minScore: number;
  maxAge: number;
  weight: number;
  enabled: boolean;
}

export interface IRSSScraperConfig {
  feeds: Array<{
    name: string;
    url: string;
    weight: number;
    enabled: boolean;
  }>;
}

export interface IScraperResponse {
  articles: Article[];
  errors?: string[];
  source: string;
}