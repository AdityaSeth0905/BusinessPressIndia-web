/**
 * Sanitizes user input to prevent XSS attacks
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
}

/**
 * Validates an email address format
 * @param email - The email to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number format
 * @param phone - The phone number to validate
 * @returns Boolean indicating if phone number is valid
 */
export function isValidPhone(phone: string): boolean {
  // Basic international phone number validation
  // Allows +, spaces, dashes, and parentheses
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/
  return phoneRegex.test(phone)
}

/**
 * Masks sensitive data for logging
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
        const parts = maskedData[field].split("@")
        if (parts.length === 2) {
          const username = parts[0]
          maskedData[field] = `${username.substring(0, 3)}${"*".repeat(username.length - 3)}@${parts[1]}`
        } else {
          maskedData[field] = "***@***.***"
        }
      } else {
        // Mask other fields: show last 4 chars only
        const value = maskedData[field].toString()
        maskedData[field] = `${"*".repeat(Math.max(0, value.length - 4))}${value.slice(-4)}`
      }
    }
  })

  return maskedData
}

