import { NextResponse } from 'next/server';
import { ContentProcessor } from '@/lib/processor';

const processor = new ContentProcessor();

export async function POST() {
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
}