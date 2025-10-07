import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/authMiddleware';
import { PathResolver } from '@/lib/shared/paths';

export const POST = requireAuth(async (request: NextRequest) => {
  return NextResponse.json({
    env: {
      CONTENT_DIR: process.env.CONTENT_DIR || 'not set',
      DATA_DIR: process.env.DATA_DIR || 'not set',
      APP_ROOT: process.env.APP_ROOT || 'not set',
      NODE_ENV: process.env.NODE_ENV,
      cwd: process.cwd()
    },
    resolved: {
      contentDir: PathResolver.contentDir,
      postsDir: PathResolver.postsDir,
      dataDir: PathResolver.dataDir
    }
  });
});
