import path from 'path';

/**
 * Environment-aware path resolver for cross-platform compatibility
 * Allows override via environment variables for different deployment environments
 */
export class PathResolver {
  private static _baseDir: string;

  static get baseDir(): string {
    if (!this._baseDir) {
      this._baseDir = process.env.APP_ROOT || process.cwd();
    }
    return this._baseDir;
  }

  static get dataDir(): string {
    return process.env.DATA_DIR || path.join(this.baseDir, 'data');
  }

  static get contentDir(): string {
    return process.env.CONTENT_DIR || path.join(this.baseDir, 'content');
  }

  static get configDir(): string {
    return process.env.CONFIG_DIR || path.join(this.baseDir, 'config');
  }

  static get queueDir(): string {
    return path.join(this.dataDir, 'queue');
  }

  static get postsDir(): string {
    return path.join(this.contentDir, 'posts');
  }

  static get logsDir(): string {
    return process.env.LOGS_DIR || path.join(this.baseDir, 'logs');
  }

  static get publicDir(): string {
    return path.join(this.baseDir, 'public');
  }

  // Queue subdirectories
  static get pendingQueueDir(): string {
    return path.join(this.queueDir, 'pending');
  }

  static get approvedQueueDir(): string {
    return path.join(this.queueDir, 'approved');
  }

  static get rejectedQueueDir(): string {
    return path.join(this.queueDir, 'rejected');
  }

  static get publishedArchiveDir(): string {
    return path.join(this.dataDir, 'published');
  }

  /**
   * For debugging: Log all resolved paths
   */
  static logPaths(): void {
    console.log('Resolved Paths:');
    console.log('  Base:', this.baseDir);
    console.log('  Data:', this.dataDir);
    console.log('  Content:', this.contentDir);
    console.log('  Config:', this.configDir);
    console.log('  Queue:', this.queueDir);
    console.log('  Posts:', this.postsDir);
    console.log('  Logs:', this.logsDir);
  }
}

// Convenience exports for common paths
export const PATHS = {
  base: PathResolver.baseDir,
  data: PathResolver.dataDir,
  content: PathResolver.contentDir,
  config: PathResolver.configDir,
  queue: PathResolver.queueDir,
  posts: PathResolver.postsDir,
  logs: PathResolver.logsDir,
  public: PathResolver.publicDir,
} as const;
