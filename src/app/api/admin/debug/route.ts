import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/authMiddleware';
import { promises as fs } from 'fs';
import path from 'path';
import { PathResolver } from '@/lib/shared/paths';

export const POST = requireAuth(async (request: NextRequest) => {
  try {
    const postsDir = PathResolver.postsDir;
    const contentDir = PathResolver.contentDir;

    const info: any = {
      paths: {
        postsDir,
        contentDir,
        exists: {
          postsDir: false,
          contentDir: false
        },
        files: {
          postsDir: [],
          contentDir: []
        }
      }
    };

    // Check if directories exist
    try {
      await fs.access(postsDir);
      info.paths.exists.postsDir = true;
      const files = await fs.readdir(postsDir);
      info.paths.files.postsDir = files;
    } catch (error) {
      info.paths.postsDirError = String(error);
    }

    try {
      await fs.access(contentDir);
      info.paths.exists.contentDir = true;
      const files = await fs.readdir(contentDir);
      info.paths.files.contentDir = files;
    } catch (error) {
      info.paths.contentDirError = String(error);
    }

    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json(
      { error: 'Debug failed', details: String(error) },
      { status: 500 }
    );
  }
});
