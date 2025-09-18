import { NextRequest, NextResponse } from 'next/server';
import { ContentProcessor } from '@/lib/processor';
import { requireAuth } from '@/lib/auth/authMiddleware';

const processor = new ContentProcessor();

export const POST = requireAuth(async (request: NextRequest) => {
  try {
    console.log('Manual scraping cycle triggered via API');
    const result = await processor.runScrapingCycle();
    
    return NextResponse.json({
      success: true,
      message: 'Scraping cycle completed',
      result
    });
  } catch (error) {
    console.error('Error during manual scraping:', error);
    return NextResponse.json(
      { error: 'Scraping cycle failed', details: error },
      { status: 500 }
    );
  }
});