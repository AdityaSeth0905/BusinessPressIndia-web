import { cookies } from "next/headers"

// Simple in-memory store for rate limiting
// In production, you would use Redis or another distributed cache
const ipRequests: Record<string, { count: number; resetTime: number }> = {}

/**
 * Rate limits requests based on IP address
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
 * @returns Boolean indicating if the submission should be allowed
 */
export function checkSubmissionFrequency(): boolean {
  const cookieStore = cookies()
  const lastSubmission = cookieStore.get("lastSubmissionTime")

  if (!lastSubmission) {
    // First submission, set cookie and allow
    cookies().set("lastSubmissionTime", Date.now().toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
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
  cookies().set("lastSubmissionTime", now.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  })

  return true
}

