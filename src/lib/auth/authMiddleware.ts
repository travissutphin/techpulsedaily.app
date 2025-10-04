import { NextRequest, NextResponse } from 'next/server';

const VALID_API_KEY = 'admin-session-key';

export function requireAuth(handler: Function) {
  return async (req: NextRequest) => {
    const apiKey = req.headers.get('x-api-key');

    if (!apiKey || apiKey !== VALID_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return handler(req);
  };
}