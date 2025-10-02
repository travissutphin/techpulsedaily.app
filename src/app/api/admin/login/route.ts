import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import authConfig from '../../../../../config/auth.json';
import { rateLimiter } from '@/lib/security/rateLimiter';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Check rate limit (using IP address or username)
    const clientId = request.headers.get('x-forwarded-for') || 'unknown-ip' || username;
    const rateLimit = rateLimiter.checkRateLimit(clientId);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: rateLimit.message },
        { status: 429 }
      );
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    if (username !== authConfig.admin.username) {
      rateLimiter.recordFailedAttempt(clientId);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, authConfig.admin.passwordHash);

    if (!isValid) {
      rateLimiter.recordFailedAttempt(clientId);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Clear rate limit on successful login
    rateLimiter.recordSuccessfulLogin(clientId);

    return NextResponse.json({
      success: true,
      apiKey: authConfig.admin.apiKey
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}