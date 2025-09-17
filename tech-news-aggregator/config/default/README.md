# Default Configuration

This directory contains the base configuration files that will be used across all environments.

## Files:
- **sources.json** - Default news sources and scraping settings
- **filters.json** - Default content filtering rules
- **site.json** - Default site settings and branding
- **schedule.json** - Default automation schedules

## Usage:
These configurations serve as the baseline. Environment-specific overrides should be placed in the `config/env/` directory.

## Note:
When migrating, copy existing config files here and they will serve as defaults for all environments.