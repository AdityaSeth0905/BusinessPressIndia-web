"use server"

import { applicationSchema } from "@/app/lib/schemas/application-schema"
import clientPromise from "@/app/lib/mongodb"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { cookies, headers } from "next/headers"
import crypto from "crypto"
import { sanitizeInput, maskSensitiveData, validateFile } from "@/app/lib/utils/form-security"
import { handleMongoDBError } from "@/app/lib/utils/db-error-handler"
import { logDatabaseOperation } from "@/app/lib/utils/db-error-handler"
import { rateLimit, checkSubmissionFrequency } from "@/app/lib/utils/rate-limiter"

/**
 * Server action to submit application form data to MongoDB
 * Handles form submission, validation, and database storage
 *
 * @param formData - The form data from the client
 * @returns Object containing success status, application ID, and message
 */
export async function submitApplication(formData: FormData) {
  // Generate a request ID for tracking this submission in logs
  const requestId = crypto.randomUUID()

  try {
    console.log(`[${requestId}] Processing application submission`)

    // Get client IP for rate limiting
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"

    // Check rate limiting
    if (!rateLimit(ip)) {
      console.log(`[${requestId}] Rate limit exceeded for IP: ${ip}`)
      return {
        success: false,
        message: "Too many requests. Please try again later.",
      }
    }

    // Check submission frequency
    if (!checkSubmissionFrequency()) {
      console.log(`[${requestId}] Submission frequency limit exceeded`)
      return {
        success: false,
        message: "You have recently submitted an application. Please wait before submitting another one.",
      }
    }

    // Convert FormData to a plain object
    const rawFormData: Record<string, any> = {}

    // Process form data with proper error handling
    try {
      formData.forEach((value, key) => {
        // Handle arrays with naming convention like siblings[0][name]
        if (key.includes("[") && key.includes("]")) {
          const match = key.match(/([^[]+)\[(\d+)\]\[([^\]]+)\]/)
          if (match) {
            const [_, baseKey, indexStr, propKey] = match
            const base = baseKey
            const index = Number.parseInt(indexStr)

            if (!rawFormData[base]) {
              rawFormData[base] = []
            }

            // Ensure the array has enough elements
            while (rawFormData[base].length <= index) {
              rawFormData[base].push({})
            }

            // Sanitize string inputs
            if (typeof value === "string") {
              rawFormData[base][index][propKey] = sanitizeInput(value)
            } else {
              rawFormData[base][index][propKey] = value
            }
          }
        } else if (key.endsWith("[]")) {
          // Handle simple arrays
          const actualKey = key.replace("[]", "")
          if (!rawFormData[actualKey]) {
            rawFormData[actualKey] = []
          }

          // Sanitize string inputs
          if (typeof value === "string") {
            rawFormData[actualKey].push(sanitizeInput(value))
          } else {
            rawFormData[actualKey].push(value)
          }
        } else if (key.startsWith("documents.")) {
          // Handle file uploads
          const documentKey = key.replace("documents.", "")
          if (!rawFormData.documents) {
            rawFormData.documents = {}
          }

          // Store file information
          if (value instanceof File) {
            // Validate file
            const validation = validateFile(
              value,
              ["application/pdf", "image/jpeg", "image/png"],
              2, // 2MB max
            )

            if (!validation.valid) {
              throw new Error(`Invalid file for ${documentKey}: ${validation.message}`)
            }

            // In a real implementation, you would upload the file to a storage service
            // and store the URL in the database. For this example, we'll just store metadata.
            rawFormData.documents[documentKey] = {
              name: value.name,
              type: value.type,
              size: value.size,
              lastModified: value.lastModified,
            }
          }
        } else {
          // Handle regular fields
          // For checkbox values, convert "on" to true
          if (value === "on") {
            rawFormData[key] = true
          } else if (typeof value === "string") {
            // Sanitize string inputs
            rawFormData[key] = sanitizeInput(value)
          } else {
            rawFormData[key] = value
          }
        }
      })
    } catch (error) {
      console.error(`[${requestId}] Error processing form data:`, error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to process form data",
      }
    }

    // Handle boolean fields for declarations
    if (rawFormData.studentDeclaration === undefined) {
      rawFormData.studentDeclaration = false
    }

    if (rawFormData.parentDeclaration === undefined) {
      rawFormData.parentDeclaration = false
    }

    console.log(`[${requestId}] Form data processed, validating...`)

    // Log sanitized data for debugging (mask sensitive data)
    console.log(`[${requestId}] Processed form data:`, maskSensitiveData(rawFormData))

    // Parse and validate the data
    let validatedData
    try {
      validatedData = applicationSchema.parse(rawFormData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorDetails = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ")
        console.error(`[${requestId}] Validation error:`, errorDetails)
        return {
          success: false,
          message: `Validation failed: ${errorDetails}`,
        }
      }
      throw error
    }

    console.log(`[${requestId}] Validation successful, connecting to MongoDB...`)

    // Connect to MongoDB with error handling
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

    // Generate a unique application ID with proper format
    const year = new Date().getFullYear()
    const randomPart = Math.floor(10000 + Math.random() * 90000)
    const applicationId = `IAF-${year}-${randomPart}`

    console.log(`[${requestId}] Generated application ID: ${applicationId}`)

    // Prepare the document to be inserted
    const applicationDocument = {
      ...validatedData,
      applicationId,
      status: "Pending",
      submittedAt: new Date(),
      // Add metadata for security and auditing
      metadata: {
        ipAddress: ip,
        userAgent: (await headersList).get("user-agent") || "unknown",
        submissionId: requestId,
        createdAt: new Date(),
      },
    }

    // Insert the application into MongoDB with error handling
    try {
      const result = await db.collection("applications").insertOne(applicationDocument)
      console.log(`[${requestId}] Application inserted successfully with ID: ${result.insertedId}`)

        logDatabaseOperation(
          "INSERT",
          "applications",
          {
            applicationId,
            mongoId: result.insertedId.toString(),
            timestamp: new Date().toISOString(),
          }
        )
      } catch (error) {
        console.error(`[${crypto.randomUUID()}] MongoDB insertion error:`, error)
        return {
          success: false,
          message: handleMongoDBError(error),
        }
      }

      // Store the application ID in a cookie for reference
      (await cookies()).set("lastApplicationId", applicationId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        sameSite: "strict",
      })

      // Revalidate the path to update any cached data
      revalidatePath("/apply")

      return {
        success: true,
        applicationId,
        message: "Application submitted successfully!",
      }
    } catch (error) {
      console.error(`[${requestId}] MongoDB insertion error:`, error)
      return {
        success: false,
        message: handleMongoDBError(error),
      }
  console.error("Error submitting application:", error)

  
}}
