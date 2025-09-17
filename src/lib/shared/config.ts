import fs from 'fs';
import path from 'path';

export class ConfigManager {
  private static instance: ConfigManager;
  private configCache: Map<string, any> = new Map();

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  getConfig<T>(configName: string): T {
    if (this.configCache.has(configName)) {
      return this.configCache.get(configName);
    }

    try {
      const configPath = path.join(process.cwd(), 'config', `${configName}.json`);
      const configContent = fs.readFileSync(configPath, 'utf8');
      let config = JSON.parse(configContent);

      // Override with environment variables for sensitive data
      if (configName === 'claude') {
        config = this.overrideClaudeConfig(config);
      } else if (configName === 'site') {
        config = this.overrideSiteConfig(config);
      }

      this.configCache.set(configName, config);
      return config;
    } catch (error) {
      console.error(`Failed to load config ${configName}:`, error);
      throw new Error(`Configuration ${configName} not found or invalid`);
    }
  }

  private overrideClaudeConfig(config: any): any {
    // Use environment variable for API key if available
    if (process.env.CLAUDE_API_KEY) {
      config.apiKey = process.env.CLAUDE_API_KEY;
    }
    return config;
  }

  private overrideSiteConfig(config: any): any {
    // Use environment variables for sensitive site config
    if (process.env.ADMIN_PASSWORD) {
      config.admin = config.admin || {};
      config.admin.password = process.env.ADMIN_PASSWORD;
    }
    if (process.env.SITE_URL) {
      config.site = config.site || {};
      config.site.url = process.env.SITE_URL;
    }
    return config;
  }

  refreshConfig(configName: string): void {
    this.configCache.delete(configName);
  }

  clearAllCache(): void {
    this.configCache.clear();
  }

  getAllConfigs(): Record<string, any> {
    return {
      sources: this.getConfig('sources'),
      filters: this.getConfig('filters'),
      claude: this.getConfig('claude'),
      schedule: this.getConfig('schedule'),
      site: this.getConfig('site')
    };
  }
}

export const config = ConfigManager.getInstance();