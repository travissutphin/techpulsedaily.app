import { NextRequest, NextResponse } from 'next/server';
import { QueueManager } from '@/lib/storage/queue';
import { ContentProcessor } from '@/lib/processor';
import { requireAuth } from '@/lib/auth/authMiddleware';

const queue = new QueueManager();
const processor = new ContentProcessor();

export const GET = requireAuth(async (request: NextRequest) => {
  try {
    const queueStats = await queue.getQueueStats();
    const processingStats = await processor.getProcessingStats();
    
    return NextResponse.json({
      queue: queueStats,
      processing: processingStats
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
});