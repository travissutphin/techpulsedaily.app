# Environment-Specific Configuration

This directory contains environment-specific configuration overrides.

## Files:
- **development.json** - Development environment settings
- **staging.json** - Staging environment settings
- **production.json** - Production environment settings

## Structure Example:
```json
{
  "site": {
    "url": "http://localhost:3000",
    "debug": true
  },
  "schedule": {
    "scraping": {
      "enabled": false
    }
  }
}
```

## How It Works:
1. Base configuration is loaded from `config/default/`
2. Environment-specific overrides are merged based on NODE_ENV
3. Final configuration is the merged result

## Note:
Only include values that differ from defaults. This keeps configs DRY and maintainable.