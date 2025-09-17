import { NextResponse } from 'next/server';
import { Publisher } from '@/lib/publisher';

const publisher = new Publisher();

export async function POST() {
  try {
    console.log('Manual publishing triggered via API');
    const result = await publisher.publishApprovedArticles();
    
    return NextResponse.json({
      success: true,
      message: 'Publishing completed',
      result
    });
  } catch (error) {
    console.error('Error during manual publishing:', error);
    return NextResponse.json(
      { error: 'Publishing failed', details: error },
      { status: 500 }
    );
  }
}