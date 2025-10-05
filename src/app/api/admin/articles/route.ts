import { NextRequest, NextResponse } from 'next/server';
import { QueueManager } from '@/lib/storage/queue';
import { requireAuth } from '@/lib/auth/authMiddleware';

const queue = new QueueManager();

export const GET = requireAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'pending';

    let articles;
    if (type === 'published') {
      articles = await queue.getPublishedArticles();
    } else {
      articles = await queue.getPendingArticles();
    }

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
});

export const POST = requireAuth(async (request: NextRequest) => {
  try {
    const { articleId, action } = await request.json();
    
    if (!articleId || !action) {
      return NextResponse.json(
        { error: 'Missing articleId or action' },
        { status: 400 }
      );
    }

    let success = false;
    
    switch (action) {
      case 'approve':
        success = await queue.approveArticle(articleId);
        break;
      case 'reject':
        success = await queue.rejectArticle(articleId);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "approve" or "reject"' },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json({ success: true, message: `Article ${action}d successfully` });
    } else {
      return NextResponse.json(
        { error: `Failed to ${action} article` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing article action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});