import { NextRequest, NextResponse } from 'next/server';
import authConfig from '../../../config/auth.json';

const API_KEY_HEADER = 'x-api-key';

export function requireAuth(handler: Function) {
  return async (req: NextRequest) => {
    const apiKey = req.headers.get(API_KEY_HEADER);

    if (!apiKey || apiKey !== authConfig.admin.apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return handler(req);
  };
}