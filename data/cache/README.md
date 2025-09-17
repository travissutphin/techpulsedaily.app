# Cache Directory

This directory stores temporary cached data to improve performance.

## Contents:
- API response caches
- Processed article caches
- AI response caches
- Image thumbnails

## Cache Strategy:
```
cache/
├── api/           # External API responses
├── ai/            # Claude AI responses
├── images/        # Resized/optimized images
└── processed/     # Processed article data
```

## TTL (Time To Live):
- API responses: 1 hour
- AI responses: 24 hours
- Images: 7 days
- Processed data: 12 hours

## Cleanup:
- Auto-cleanup runs daily at 2 AM
- Files older than TTL are removed
- Can be manually cleared anytime

## Note:
This directory can be safely deleted anytime - it will be recreated as needed.