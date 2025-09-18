import { NextRequest, NextResponse } from 'next/server';
import { Publisher } from '@/lib/publisher';
import { requireAuth } from '@/lib/auth/authMiddleware';

const publisher = new Publisher();

export const POST = requireAuth(async (request: NextRequest) => {
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
});