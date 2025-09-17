import cron from 'node-cron';
import { ContentProcessor } from './processor';
import { Publisher } from './publisher';
import { QueueManager } from './storage/queue';
import { config } from './utils/config';

export class Scheduler {
  private processor: ContentProcessor;
  private publisher: Publisher;
  private queue: QueueManager;
  private jobs: Map<string, any> = new Map();

  constructor() {
    this.processor = new ContentProcessor();
    this.publisher = new Publisher();
    this.queue = new QueueManager();
  }

  start(): void {
    const scheduleConfig = config.getConfig('schedule') as any as any;
    
    if (!scheduleConfig.scraping.enabled) {
      console.log('Scheduling is disabled in configuration');
      return;
    }

    console.log('Starting automated scheduling system...');

    // Set up scraping jobs for configured times
    this.setupScrapingJobs(scheduleConfig.scraping.times);

    // Set up cleanup job
    if (scheduleConfig.maintenance.cleanupOldData.enabled) {
      this.setupCleanupJob(scheduleConfig.maintenance.cleanupOldData);
    }

    // Set up publishing job (if auto-publish is enabled)
    if (scheduleConfig.publishing.autoPublish) {
      this.setupPublishingJob();
    }

    console.log('Scheduler started successfully');
    this.logNextJobs();
  }

  stop(): void {
    console.log('Stopping all scheduled jobs...');
    
    this.jobs.forEach((job, name) => {
      job.stop();
      console.log(`Stopped job: ${name}`);
    });
    
    this.jobs.clear();
    console.log('All jobs stopped');
  }

  private setupScrapingJobs(times: string[]): void {
    times.forEach((time, index) => {
      const [hours, minutes] = time.split(':');
      const cronExpression = `${minutes} ${hours} * * *`; // Daily at specified time
      
      const job = cron.schedule(cronExpression, async () => {
        console.log(`🤖 Automated scraping started at ${new Date().toISOString()}`);
        
        try {
          const result = await this.processor.runScrapingCycle();
          
          console.log('✅ Scraping cycle completed:', {
            scraped: result.scraped,
            processed: result.processed,
            queued: result.queued,
            errors: result.errors.length
          });

          // Log errors if any
          if (result.errors.length > 0) {
            console.error('Scraping errors:', result.errors);
          }

        } catch (error) {
          console.error('❌ Scraping cycle failed:', error);
        }
      }, {
        scheduled: true,
        timezone: 'America/New_York'
      } as any);

      const jobName = `scraping_${index}_${time}`;
      this.jobs.set(jobName, job);
      console.log(`📅 Scheduled scraping job: ${jobName} at ${time} EST`);
    });
  }

  private setupCleanupJob(cleanupConfig: any): void {
    const job = cron.schedule(cleanupConfig.schedule, async () => {
      console.log(`🧹 Starting cleanup job at ${new Date().toISOString()}`);
      
      try {
        await this.queue.cleanupOldEntries(cleanupConfig.retentionDays);
        console.log('✅ Cleanup job completed');
      } catch (error) {
        console.error('❌ Cleanup job failed:', error);
      }
    }, {
      scheduled: true,
      timezone: 'America/New_York'
    } as any);

    this.jobs.set('cleanup', job);
    console.log(`📅 Scheduled cleanup job: ${cleanupConfig.schedule}`);
  }

  private setupPublishingJob(): void {
    // Run publishing every hour to check for approved articles
    const job = cron.schedule('0 * * * *', async () => {
      console.log(`📰 Starting publishing job at ${new Date().toISOString()}`);
      
      try {
        const result = await this.publisher.publishApprovedArticles();
        
        if (result.published > 0) {
          console.log(`✅ Published ${result.published} articles`);
        }
        
        if (result.errors.length > 0) {
          console.error('Publishing errors:', result.errors);
        }
      } catch (error) {
        console.error('❌ Publishing job failed:', error);
      }
    }, {
      scheduled: true,
      timezone: 'America/New_York'
    } as any);

    this.jobs.set('publishing', job);
    console.log('📅 Scheduled auto-publishing job: hourly');
  }

  private logNextJobs(): void {
    console.log('\n📋 Scheduled Jobs Summary:');
    console.log('═'.repeat(50));
    
    this.jobs.forEach((job, name) => {
      console.log(`${name}: Next run scheduled`);
    });
    
    console.log('═'.repeat(50));
  }

  // Manual triggers for development/testing
  async runManualScrape(): Promise<any> {
    console.log('🔧 Manual scraping triggered');
    return await this.processor.runScrapingCycle();
  }

  async runManualPublish(): Promise<any> {
    console.log('🔧 Manual publishing triggered');
    return await this.publisher.publishApprovedArticles();
  }

  async runManualCleanup(): Promise<void> {
    console.log('🔧 Manual cleanup triggered');
    const scheduleConfig = config.getConfig('schedule') as any as any;
    await this.queue.cleanupOldEntries(
      scheduleConfig.maintenance.cleanupOldData.retentionDays || 30
    );
  }

  getJobStatus(): Array<{name: string, running: boolean, nextRun?: string}> {
    const status: Array<{name: string, running: boolean, nextRun?: string}> = [];
    
    this.jobs.forEach((job, name) => {
      status.push({
        name,
        running: job.running || false,
        nextRun: job.nextDate ? job.nextDate().toISOString() : undefined
      });
    });
    
    return status;
  }
}

// Singleton instance for use across the application
let schedulerInstance: Scheduler | null = null;

export function getScheduler(): Scheduler {
  if (!schedulerInstance) {
    schedulerInstance = new Scheduler();
  }
  return schedulerInstance;
}

// Auto-start scheduler when imported (for production)
if (process.env.NODE_ENV === 'production') {
  process.nextTick(() => {
    const scheduler = getScheduler();
    scheduler.start();
  });
}