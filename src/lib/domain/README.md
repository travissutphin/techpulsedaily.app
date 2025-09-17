# Domain Models

This directory contains domain entities and business objects that represent core concepts in the application.

## Purpose:
Domain models encapsulate business logic related to specific entities, ensuring data integrity and business rule enforcement.

## Planned Models:

### article.ts
```typescript
export class Article {
  constructor(
    public title: string,
    public content: string,
    public source: string
  ) {
    this.validate();
  }

  private validate(): void {
    // Business rules validation
  }

  calculateQualityScore(): number {
    // Domain logic for scoring
  }

  shouldPublish(): boolean {
    // Publishing criteria
  }
}
```

### queue.ts
```typescript
export class ArticleQueue {
  private items: QueueItem[] = [];

  add(article: Article): void {
    // Queue management logic
  }

  getNextForReview(): Article | null {
    // Priority and selection logic
  }
}
```

### source.ts
- News source configuration
- Source reliability scoring
- Rate limiting logic

## Design Principles:
1. **Rich domain models** - Not just data containers
2. **Encapsulation** - Hide internal complexity
3. **Business rules** - Enforce invariants
4. **Self-validating** - Always in valid state

## Migration Note:
Extract domain logic from existing services into these focused models.