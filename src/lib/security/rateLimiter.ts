interface LoginAttempt {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
  lockedUntil: number | null;
}

class RateLimiter {
  private attempts: Map<string, LoginAttempt> = new Map();
  private readonly MAX_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in ms
  private readonly ATTEMPT_WINDOW = 15 * 60 * 1000; // 15 minutes in ms
  private readonly PROGRESSIVE_DELAYS = [0, 1000, 2000, 4000, 8000]; // Progressive delays in ms

  private cleanupStaleEntries(): void {
    const now = Date.now();
    for (const [key, attempt] of this.attempts.entries()) {
      // Remove entries older than the attempt window and not locked
      if (now - attempt.lastAttempt > this.ATTEMPT_WINDOW && !attempt.lockedUntil) {
        this.attempts.delete(key);
      }
      // Remove expired lockouts
      if (attempt.lockedUntil && now > attempt.lockedUntil) {
        this.attempts.delete(key);
      }
    }
  }

  public checkRateLimit(identifier: string): {
    allowed: boolean;
    delay: number;
    remainingAttempts: number;
    lockedUntil: number | null;
    message: string;
  } {
    this.cleanupStaleEntries();

    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    // No previous attempts
    if (!attempt) {
      return {
        allowed: true,
        delay: 0,
        remainingAttempts: this.MAX_ATTEMPTS,
        lockedUntil: null,
        message: 'Login allowed'
      };
    }

    // Check if locked out
    if (attempt.lockedUntil && now < attempt.lockedUntil) {
      const remainingLockTime = Math.ceil((attempt.lockedUntil - now) / 1000 / 60);
      return {
        allowed: false,
        delay: 0,
        remainingAttempts: 0,
        lockedUntil: attempt.lockedUntil,
        message: `Too many failed attempts. Please try again in ${remainingLockTime} minutes.`
      };
    }

    // Reset attempts if outside the window
    if (now - attempt.firstAttempt > this.ATTEMPT_WINDOW) {
      this.attempts.delete(identifier);
      return {
        allowed: true,
        delay: 0,
        remainingAttempts: this.MAX_ATTEMPTS,
        lockedUntil: null,
        message: 'Login allowed'
      };
    }

    // Check if within attempt limit
    const remainingAttempts = this.MAX_ATTEMPTS - attempt.count;
    if (remainingAttempts > 0) {
      const delay = this.PROGRESSIVE_DELAYS[Math.min(attempt.count, this.PROGRESSIVE_DELAYS.length - 1)];
      return {
        allowed: true,
        delay,
        remainingAttempts,
        lockedUntil: null,
        message: delay > 0 ? `Please wait ${delay / 1000} seconds before trying again` : 'Login allowed'
      };
    }

    // Should not reach here, but handle as locked
    return {
      allowed: false,
      delay: 0,
      remainingAttempts: 0,
      lockedUntil: now + this.LOCKOUT_DURATION,
      message: 'Account locked due to too many failed attempts'
    };
  }

  public recordFailedAttempt(identifier: string): void {
    const now = Date.now();
    const existing = this.attempts.get(identifier);

    if (!existing) {
      // First failed attempt
      this.attempts.set(identifier, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now,
        lockedUntil: null
      });
    } else {
      // Increment attempt count
      existing.count++;
      existing.lastAttempt = now;

      // Lock account if max attempts exceeded
      if (existing.count >= this.MAX_ATTEMPTS) {
        existing.lockedUntil = now + this.LOCKOUT_DURATION;
      }

      this.attempts.set(identifier, existing);
    }
  }

  public recordSuccessfulLogin(identifier: string): void {
    // Clear attempts on successful login
    this.attempts.delete(identifier);
  }

  public resetAttempts(identifier: string): void {
    // Manual reset for admin purposes
    this.attempts.delete(identifier);
  }

  public getAttemptInfo(identifier: string): LoginAttempt | undefined {
    return this.attempts.get(identifier);
  }

  public getAllAttempts(): Map<string, LoginAttempt> {
    this.cleanupStaleEntries();
    return new Map(this.attempts);
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();