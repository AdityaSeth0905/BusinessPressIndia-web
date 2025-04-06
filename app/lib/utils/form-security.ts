/**
 * Sanitizes user input to prevent XSS attacks
 * Replaces potentially dangerous characters with HTML entities
 *
 * @param input - The user input to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return ""

  // Replace potentially dangerous characters
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/`/g, "&#x60;")
    .replace(/\\/g, "&#x5C;")
}

/**
 * Validates an email address format
 * Uses a comprehensive regex for email validation
 *
 * @param email - The email to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number format
 * Allows international formats with country codes
 *
 * @param phone - The phone number to validate
 * @returns Boolean indicating if phone number is valid
 */
export function isValidPhone(phone: string): boolean {
  // International phone number validation
  // Allows +, spaces, dashes, and parentheses
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/
  return phoneRegex.test(phone)
}

/**
 * Masks sensitive data for logging
 * Hides most of the characters in sensitive fields
 *
 * @param data - The data containing sensitive information
 * @returns Data with sensitive information masked
 */
export function maskSensitiveData(data: Record<string, any>): Record<string, any> {
  const maskedData = { ...data }

  // Fields to mask
  const sensitiveFields = [
    "govtIdNumber",
    "passportNumber",
    "studentMobile",
    "fatherMobile",
    "motherMobile",
    "studentEmail",
    "parentEmail",
  ]

  sensitiveFields.forEach((field) => {
    if (maskedData[field]) {
      if (field.includes("Email")) {
        // Mask email: show first 3 chars and domain
        const parts = String(maskedData[field]).split("@")
        if (parts.length === 2) {
          const username = parts[0]
          maskedData[field] = `${username.substring(0, 3)}${"*".repeat(Math.max(1, username.length - 3))}@${parts[1]}`
        } else {
          maskedData[field] = "***@***.***"
        }
      } else if (field.includes("Mobile")) {
        // Mask phone: show last 4 digits only
        const value = String(maskedData[field])
        maskedData[field] = `${"*".repeat(Math.max(0, value.length - 4))}${value.slice(-4)}`
      } else {
        // Mask other sensitive fields: show first 2 and last 2 chars
        const value = String(maskedData[field])
        if (value.length > 4) {
          maskedData[field] = `${value.substring(0, 2)}${"*".repeat(value.length - 4)}${value.slice(-2)}`
        } else {
          maskedData[field] = "****"
        }
      }
    }
  })

  return maskedData
}

/**
 * Validates file size and type
 * Ensures uploaded files meet security requirements
 *
 * @param file - The file to validate
 * @param allowedTypes - Array of allowed MIME types
 * @param maxSizeMB - Maximum file size in MB
 * @returns Object with validation result and message
 */
export function validateFile(
  file: File,
  allowedTypes: string[] = ["application/pdf", "image/jpeg", "image/png"],
  maxSizeMB = 2,
): { valid: boolean; message: string } {
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      message: `File size exceeds the maximum limit of ${maxSizeMB}MB.`,
    }
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}.`,
    }
  }

  return { valid: true, message: "File is valid." }
}

/**
 * Generates a secure random token
 * Used for CSRF protection and other security measures
 *
 * @param length - Length of the token
 * @returns Random secure token
 */
export function generateSecureToken(length = 32): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const randomValues = new Uint8Array(length)

  // Use crypto API if available (browser or Node.js)
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues)
  } else {
    // Fallback to Math.random (less secure)
    for (let i = 0; i < length; i++) {
      randomValues[i] = Math.floor(Math.random() * 256)
    }
  }

  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % characters.length)
  }

  return result
}

