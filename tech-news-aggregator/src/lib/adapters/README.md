# Adapters - External Service Integrations

This directory contains all integrations with external services and systems.

## Purpose:
Adapters implement the "how" - they handle the technical details of interacting with external systems while providing clean interfaces to the core business logic.

## Structure:

### /scrapers
Content source integrations:
- Reddit API adapter
- Hacker News adapter
- RSS feed adapter
- Future: Twitter, LinkedIn, etc.

### /ai
AI service integrations:
- Claude/Anthropic adapter
- Future: OpenAI, Google Gemini, local LLMs

### /storage
Data persistence adapters:
- File system adapter (current)
- Future: PostgreSQL, MongoDB, S3

## Design Pattern:
```typescript
// Example adapter interface
export interface IScraperAdapter {
  scrape(config: ScraperConfig): Promise<RawArticle[]>;
  validateSource(url: string): Promise<boolean>;
}

// Example implementation
export class RedditScraperAdapter implements IScraperAdapter {
  async scrape(config: ScraperConfig): Promise<RawArticle[]> {
    // Implementation details
  }
}
```

## Benefits:
1. **Swappable implementations** - Easy to change providers
2. **Testable** - Mock adapters for testing
3. **Separation of concerns** - Business logic stays clean
4. **Gradual migration** - Add new adapters without breaking existing code