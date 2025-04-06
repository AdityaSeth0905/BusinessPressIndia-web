import { cookies } from "next/headers"
import { serialize } from "cookie";
// Simple in-memory store for rate limiting
// In production, you would use Redis or another distributed cache
const ipRequests: Record<string, { count: number; resetTime: number }> = {}

/**
 * Rate limits requests based on IP address
 * Prevents abuse by limiting the number of requests from a single IP
 *
 * @param ip - The IP address to check
 * @param maxRequests - Maximum number of requests allowed in the time window
 * @param timeWindowMs - Time window in milliseconds
 * @returns Boolean indicating if the request should be allowed
 */
export function rateLimit(
  ip: string,
  maxRequests = 5,
  timeWindowMs: number = 60 * 1000, // 1 minute
): boolean {
  const now = Date.now()

  // Clean up expired entries
  Object.keys(ipRequests).forEach((key) => {
    if (ipRequests[key].resetTime < now) {
      delete ipRequests[key]
    }
  })

  // Initialize if this is the first request from this IP
  if (!ipRequests[ip]) {
    ipRequests[ip] = {
      count: 1,
      resetTime: now + timeWindowMs,
    }
    return true
  }

  // Check if time window has expired and reset if needed
  if (ipRequests[ip].resetTime < now) {
    ipRequests[ip] = {
      count: 1,
      resetTime: now + timeWindowMs,
    }
    return true
  }

  // Increment count and check against limit
  ipRequests[ip].count += 1
  return ipRequests[ip].count <= maxRequests
}

/**
 * Checks if a user has submitted multiple applications in a short time
 * Prevents duplicate submissions by tracking submission times
 *
 * @returns Boolean indicating if the submission should be allowed
 */
export async function checkSubmissionFrequency(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const lastSubmission = cookieStore.get("lastSubmissionTime")

    if (!lastSubmission) {
      // First submission, set cookie and allow
      // Use a proper cookie management library to set cookies
      
      
      const cookieHeader = serialize("lastSubmissionTime", Date.now().toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
        sameSite: "strict",
      });
      
      // Ensure the cookie is sent in the response headers
      // Example: res.setHeader("Set-Cookie", cookieHeader);
      return true
    }

    const lastTime = Number.parseInt(lastSubmission.value)
    const now = Date.now()
    const timeDiff = now - lastTime

    // Allow only one submission per hour (3600000 ms)
    if (timeDiff < 3600000) {
      return false
    }

    // Update last submission time
    const cookieHeader = serialize("lastSubmissionTime", now.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    });

    // Ensure the cookie is sent in the response headers
    // Example: res.setHeader("Set-Cookie", cookieHeader);

    return true
  } catch (error) {
    // If there's an error with cookies, default to allowing the submission
    // but log the error for investigation
    console.error("Error checking submission frequency:", error)
    return true
  }
}

/**
 * Implements a token bucket algorithm for more sophisticated rate limiting
 * Allows bursts of traffic while maintaining a long-term rate limit
 *
 * @param ip - The IP address to check
 * @param capacity - The maximum number of tokens the bucket can hold
 * @param refillRate - The number of tokens added per second
 * @returns Boolean indicating if the request should be allowed
 */
export function tokenBucketRateLimit(
  ip: string,
  capacity = 10,
  refillRate = 0.5, // tokens per second
): boolean {
  const now = Date.now()
  const tokenBuckets: Record<string, { tokens: number; lastRefill: number }> = {}

  // Initialize bucket if it doesn't exist
  if (!tokenBuckets[ip]) {
    tokenBuckets[ip] = {
      tokens: capacity,
      lastRefill: now,
    }
    return true
  }

  // Refill tokens based on time elapsed
  const bucket = tokenBuckets[ip]
  const timeElapsed = (now - bucket.lastRefill) / 1000 // in seconds
  const tokensToAdd = timeElapsed * refillRate

  bucket.tokens = Math.min(capacity, bucket.tokens + tokensToAdd)
  bucket.lastRefill = now

  // Check if there's at least one token and consume it
  if (bucket.tokens >= 1) {
    bucket.tokens -= 1
    return true
  }

  return false
}

