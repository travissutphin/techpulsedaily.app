# Core Business Logic

This directory contains the core business logic of the application - the "what" of the system.

## Purpose:
Core modules define business rules and orchestrate operations without concerning themselves with implementation details.

## Planned Modules:
- **aggregator.ts** - Orchestrates content aggregation workflow
- **publisher.ts** - Manages publishing pipeline and rules
- **scheduler.ts** - Handles scheduling logic and timing
- **analyzer.ts** - Content quality analysis and scoring

## Design Principles:
1. **No external dependencies** - Core should not import from adapters
2. **Pure business logic** - Focus on rules, not implementation
3. **Testable** - Easy to unit test without mocking externals
4. **Framework agnostic** - Could work outside Next.js

## Example Structure:
```typescript
// aggregator.ts
export class ContentAggregator {
  constructor(
    private scraper: IScraperAdapter,
    private analyzer: IAnalyzerAdapter,
    private storage: IStorageAdapter
  ) {}

  async aggregate(): Promise<Article[]> {
    // Business logic here
  }
}
```

## Migration Note:
When ready, refactor existing `lib/processor.ts` and `lib/publisher.ts` into this structure.