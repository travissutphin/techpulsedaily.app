import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Get admin password from environment or default
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

// Check if still using default password
export function isUsingDefaultPassword(): boolean {
  return getAdminPassword() === 'admin123';
}

// Check if request is authenticated
export function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get('admin_authenticated');
  return cookie?.value === 'true';
}

// Get the installation date (when package-lock.json was created)
function getInstallDate(): Date {
  try {
    const packageLockPath = path.join(process.cwd(), 'package-lock.json');
    const stats = fs.statSync(packageLockPath);
    return stats.birthtime;
  } catch {
    // If can't determine, assume it was installed today
    return new Date();
  }
}

// Calculate days since installation
export function getDaysSinceInstall(): number {
  const installDate = getInstallDate();
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - installDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Get security warning level based on days using default password
export type SecurityLevel = 'warning' | 'critical' | 'blocked' | null;

export function getSecurityLevel(): SecurityLevel {
  if (!isUsingDefaultPassword()) return null;

  const days = getDaysSinceInstall();

  if (days >= 4) return 'blocked';
  if (days >= 2) return 'critical';
  if (days >= 1) return 'warning';

  return 'warning'; // Day 0-1 shows warning
}

// Check if access should be blocked
export function shouldBlockAccess(): boolean {
  return getSecurityLevel() === 'blocked';
}

// Get security message for UI
export function getSecurityMessage(): {
  level: SecurityLevel;
  title: string;
  message: string;
  showInstructions: boolean;
} | null {
  const level = getSecurityLevel();
  if (!level) return null;

  const days = getDaysSinceInstall();

  switch (level) {
    case 'blocked':
      return {
        level: 'blocked',
        title: '🚫 Access Blocked - Default Password',
        message: `You have been using the default password for ${days} days. Access is now blocked for security reasons.`,
        showInstructions: true
      };
    case 'critical':
      return {
        level: 'critical',
        title: '🚨 Critical Security Alert',
        message: `You have been using the default password for ${days} days. Access will be blocked in ${4 - days} day(s).`,
        showInstructions: true
      };
    case 'warning':
      return {
        level: 'warning',
        title: '⚠️ Security Warning',
        message: `You are using the default password. Please change it as soon as possible.`,
        showInstructions: true
      };
    default:
      return null;
  }
}

// Create auth middleware response
export function createAuthErrorResponse(): NextResponse {
  return NextResponse.json(
    { error: 'Unauthorized', message: 'Please login to access this endpoint' },
    { status: 401 }
  );
}