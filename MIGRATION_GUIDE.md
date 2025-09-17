# Migration Guide - New Folder Structure

## ✅ Phase 1: COMPLETED - New Structure Created

The new folder structure has been created alongside the existing code. **No functionality has been affected.**

## ✅ Phase 2: COMPLETED - Utilities and Types Migrated

Utilities and types have been successfully migrated to the new shared location with backward compatibility maintained.

## ✅ Phase 3: COMPLETED - Scrapers Refactored into Adapters

All scrapers have been successfully refactored into the adapter pattern with full backward compatibility.

### What Was Migrated:

**Phase 2 - Utilities & Types:**
- `lib/types.ts` → `lib/shared/types.ts` (original now re-exports from shared)
- `lib/utils/config.ts` → `lib/shared/config.ts` (original now re-exports from shared)
- Created `lib/shared/constants.ts` for common constants
- Created `lib/shared/index.ts` for clean exports

**Phase 3 - Scrapers:**
- `lib/scrapers/reddit.ts` → `lib/adapters/scrapers/reddit.ts`
- `lib/scrapers/hackernews.ts` → `lib/adapters/scrapers/hackernews.ts`
- `lib/scrapers/rss.ts` → `lib/adapters/scrapers/rss.ts`
- `lib/scrapers/index.ts` → `lib/adapters/scrapers/index.ts`
- Created `lib/adapters/scrapers/interfaces.ts` for adapter contracts
- All scrapers now implement `IScraperAdapter` interface

### Backward Compatibility:
- Original files still exist and re-export from new locations
- No import changes needed in existing code
- App continues working exactly as before

## 📁 New Structure Overview

```
tech-news-aggregator/
├── config/
│   ├── default/        # Base configurations (NEW)
│   ├── env/           # Environment overrides (NEW)
│   └── secrets/       # Sensitive data - gitignored (NEW)
├── content/
│   ├── posts/         # (existing)
│   ├── drafts/        # Work in progress posts (NEW)
│   └── archives/      # Older content by year (NEW)
├── data/
│   ├── queue/         # (existing)
│   ├── cache/         # Temporary caches (NEW)
│   └── logs/          # Application logs (NEW)
└── src/
    ├── lib/
    │   ├── core/      # Business logic (NEW)
    │   ├── adapters/  # External integrations (NEW)
    │   ├── shared/    # Utilities and types (NEW - ACTIVE)
    │   └── domain/    # Domain models (NEW)
    └── components/    # Reusable React components (NEW)
```

## 🚀 Next Steps (When Ready)

### Phase 4: Move Configuration Files
```bash
# Copy existing configs to default folder
cp config/*.json config/default/

# Create development overrides
echo '{"site":{"url":"http://localhost:3000"}}' > config/env/development.json

# Move sensitive data
mv config/claude.json config/secrets/
```


### Phase 5: Extract Core Logic
1. Split `processor.ts` into core modules
2. Move business rules to `lib/core/`
3. Keep adapters separate

## 📝 Benefits Realized So Far

1. **Better Organization** - Types and config now centralized
2. **Constants Management** - All constants in one place
3. **Clean Exports** - Single import point for shared modules
4. **Backward Compatible** - No breaking changes
5. **Ready for Growth** - Foundation laid for future migration

## ⚠️ Important Notes

- **Current app continues working** - No changes to existing functionality
- **Migration is optional** - Only migrate when you're ready
- **Gradual migration** - Can be done piece by piece
- **No rush** - Structure is ready for when you need it

## 🔒 Security Reminder

Add to `.gitignore` immediately:
```
config/secrets/
data/logs/
.env*
!.env.example
```

## 📊 Migration Progress

- [x] Phase 1: Create folder structure
- [x] Phase 2: Move utilities and types
- [x] Phase 3: Refactor scrapers into adapters
- [ ] Phase 4: Move configuration files
- [ ] Phase 5: Extract core logic

---

The app is working perfectly with the new shared utilities. Continue using the app as normal - further migration phases are optional.