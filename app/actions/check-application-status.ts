"use server"

import clientPromise from "@/app/lib/mongodb"
import { z } from "zod"
import { rateLimit } from "@/app/lib/utils/rate-limiter"
import { sanitizeInput } from "@/app/lib/utils/form-security"
import { handleMongoDBError } from "@/app/lib/utils/db-error-handler"
import { headers } from "next/headers"
import crypto from "crypto"

/**
 * Schema for application status check
 * Validates the required fields for checking application status
 */
const statusCheckSchema = z.object({
  applicationId: z
    .string()
    .min(1, "Application ID is required")
    .regex(/^IAF-\d{4}-\d{5}$/, "Invalid application ID format"),
  contactNumber: z
    .string()
    .min(10, "Contact number is required")
    .regex(/^[+]?[0-9\s-()]+$/, "Please enter a valid contact number"),
})

/**
 * Server action to check application status
 * Allows users to check their application status using ID and contact number
 *
 * @param formData - The form data containing applicationId and contactNumber
 * @returns Object containing success status and application details
 */
export async function checkApplicationStatus(formData: FormData) {
  try {
    // Generate a request ID for tracking
    const requestId = crypto.randomUUID()

    // Get client IP for rate limiting
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"

    console.log(`[${requestId}] Processing status check request from IP: ${ip}`)

    // Apply stricter rate limiting for status checks (3 requests per minute)
    if (!rateLimit(ip, 3, 60 * 1000)) {
      console.log(`[${requestId}] Rate limit exceeded for IP: ${ip}`)
      return {
        success: false,
        message: "Too many requests. Please try again later.",
      }
    }

    // Extract and sanitize form data
    const rawData = {
      applicationId: sanitizeInput(formData.get("applicationId")?.toString() || ""),
      contactNumber: sanitizeInput(formData.get("contactNumber")?.toString() || ""),
    }

    console.log(`[${requestId}] Checking status for application ID: ${rawData.applicationId}`)

    // Validate the data
    try {
      statusCheckSchema.parse(rawData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorDetails = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ")
        console.log(`[${requestId}] Validation error: ${errorDetails}`)
        return {
          success: false,
          message: `Validation failed: ${errorDetails}`,
        }
      }
      throw error
    }

    // Connect to MongoDB
    let client
    try {
      client = await clientPromise
    } catch (error) {
      console.error(`[${requestId}] MongoDB connection error:`, error)
      return {
        success: false,
        message: handleMongoDBError(error),
      }
    }

    const db = client.db("indo_african_scholarships")

    // Find the application
    const application = await db.collection("applications").findOne({
      applicationId: rawData.applicationId,
      $or: [
        { studentMobile: rawData.contactNumber },
        { fatherMobile: rawData.contactNumber },
        { motherMobile: rawData.contactNumber },
      ],
    })

    if (!application) {
      console.log(`[${requestId}] No application found for ID: ${rawData.applicationId}`)
      return {
        success: false,
        message: "No application found with the provided ID and contact number.",
      }
    }

    console.log(`[${requestId}] Application found, returning status information`)

    // Return application status with limited information for security
    return {
      success: true,
      data: {
        applicationId: application.applicationId,
        status: application.status,
        name: `${application.firstName} ${application.lastName}`,
        programType: application.programType,
        submittedAt: application.submittedAt,
        lastUpdated: application.metadata?.lastUpdated || application.submittedAt,
        // Include additional status information if available
        statusDetails: application.statusDetails || null,
        expectedResponseDate: application.expectedResponseDate || null,
      },
    }
  } catch (error) {
    console.error("Error checking application status:", error)

    return {
      success: false,
      message: "An error occurred while checking your application status. Please try again later.",
    }
  }
}

