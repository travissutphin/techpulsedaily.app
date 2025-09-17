# Shared Utilities

This directory contains shared utilities, types, and constants used across the application.

## Contents:

### types.ts
- Shared TypeScript interfaces and types
- Data transfer objects (DTOs)
- Common type definitions

### constants.ts
- Application-wide constants
- Configuration defaults
- Magic numbers and strings

### config.ts
- Configuration loading and merging logic
- Environment variable handling
- Config validation

### utils.ts
- Helper functions
- Date formatting
- String manipulation
- Validation utilities

## Usage Example:
```typescript
// Import shared types
import { Article, ScraperConfig } from '@/lib/shared/types';
import { MAX_ARTICLE_LENGTH, DEFAULT_TIMEZONE } from '@/lib/shared/constants';
import { formatDate, sanitizeHtml } from '@/lib/shared/utils';
```

## Guidelines:
1. Only truly shared code belongs here
2. Keep utilities pure and side-effect free
3. Well-documented with JSDoc comments
4. Comprehensive unit tests

## Migration Note:
Current `lib/types.ts` and `lib/utils/config.ts` will eventually move here.