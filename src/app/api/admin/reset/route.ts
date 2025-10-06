import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/authMiddleware';
import { promises as fs } from 'fs';
import path from 'path';

export const POST = requireAuth(async (request: NextRequest) => {
  try {
    const dataDir = process.env.DATA_DIR || path.join(process.cwd(), 'data');
    const queueDir = path.join(dataDir, 'queue');

    const directories = [
      path.join(queueDir, 'pending'),
      path.join(queueDir, 'approved'),
      path.join(queueDir, 'rejected'),
      path.join(queueDir, 'published')
    ];

    let filesDeleted = 0;

    for (const dir of directories) {
      try {
        // Ensure directory exists
        await fs.mkdir(dir, { recursive: true });

        // Read all files in directory
        const files = await fs.readdir(dir);

        // Delete each file
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = await fs.stat(filePath);

          if (stat.isFile()) {
            await fs.unlink(filePath);
            filesDeleted++;
          }
        }
      } catch (error) {
        console.error(`Error clearing ${dir}:`, error);
      }
    }

    console.log(`Queue reset complete - deleted ${filesDeleted} files`);

    return NextResponse.json({
      success: true,
      message: `Successfully cleared all queues`,
      filesDeleted
    });
  } catch (error) {
    console.error('Error resetting queues:', error);
    return NextResponse.json(
      { error: 'Failed to reset queues', details: error },
      { status: 500 }
    );
  }
});
