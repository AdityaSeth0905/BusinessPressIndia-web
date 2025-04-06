"use server"

import clientPromise from "@/app/lib/mongodb"
import { z } from "zod"
import { rateLimit } from "@/app/lib/utils/rate-limiter"

// Schema for application status check
const statusCheckSchema = z.object({
  applicationId: z.string().min(1, "Application ID is required"),
  contactNumber: z.string().min(10, "Contact number is required"),
})

/**
 * Server action to check application status
 * @param formData - The form data containing applicationId and contactNumber
 * @returns Object containing success status and application details
 */
export async function checkApplicationStatus(formData: FormData) {
  try {
    // Get client IP for rate limiting
    const ip = headers().get("x-forwarded-for") || "unknown"

    // Apply stricter rate limiting for status checks (3 requests per minute)
    if (!rateLimit(ip, 3, 60 * 1000)) {
      return {
        success: false,
        message: "Too many requests. Please try again later.",
      }
    }

    // Extract and validate form data
    const rawData = {
      applicationId: formData.get("applicationId")?.toString() || "",
      contactNumber: formData.get("contactNumber")?.toString() || "",
    }

    try {
      statusCheckSchema.parse(rawData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorDetails = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ")
        return {
          success: false,
          message: `Validation failed: ${errorDetails}`,
        }
      }
      throw error
    }

    // Connect to MongoDB
    const client = await clientPromise
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
      return {
        success: false,
        message: "No application found with the provided ID and contact number.",
      }
    }

    // Return application status
    return {
      success: true,
      data: {
        applicationId: application.applicationId,
        status: application.status,
        name: `${application.firstName} ${application.lastName}`,
        programType: application.programType,
        submittedAt: application.submittedAt,
        // Add any other fields you want to return
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

// Helper function to safely get headers
function headers() {
  try {
    return new Headers()
  } catch (e) {
    return {
      get: () => null,
    }
  }
}

