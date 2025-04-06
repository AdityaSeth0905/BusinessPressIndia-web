/**
 * Handles MongoDB errors and returns user-friendly messages
 * Maps common MongoDB error codes to readable messages
 *
 * @param error - The error object from MongoDB
 * @returns User-friendly error message
 */
export function handleMongoDBError(error: any): string {
  // Check for common MongoDB error codes
  if (error.code) {
    switch (error.code) {
      case 11000: // Duplicate key error
        return "A record with this information already exists."

      case 121: // Document validation error
        return "The data provided does not meet the requirements."

      case 7: // Connection error
        return "Unable to connect to the database. Please try again later."

      case 89: // Network timeout
        return "The database request timed out. Please try again later."

      case 8000: // AtlasError
        return "There was an issue with the database service. Please try again later."

      default:
        console.error("MongoDB error:", error)
        return "A database error occurred. Please try again later."
    }
  }

  // Check for network or timeout errors
  if (error.name === "MongoNetworkError" || error.message?.includes("timeout")) {
    return "Network error connecting to the database. Please check your connection and try again."
  }

  // Check for authentication errors
  if (error.name === "MongoServerSelectionError" && error.message?.includes("authentication")) {
    return "Database authentication failed. Please contact support."
  }

  // Default error message
  console.error("Unhandled MongoDB error:", error)
  return "An unexpected error occurred. Please try again later."
}

/**
 * Logs database operations for auditing
 * Creates structured logs for database operations
 *
 * @param operation - The database operation being performed
 * @param collection - The collection being operated on
 * @param details - Additional details about the operation
 */
export function logDatabaseOperation(operation: string, collection: string, details: any): void {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    operation,
    collection,
    details,
  }

  // Log in structured JSON format for easier parsing
  console.log(`[DB_AUDIT] ${JSON.stringify(logEntry)}`)
}

/**
 * Validates MongoDB ObjectId
 * Checks if a string is a valid MongoDB ObjectId
 *
 * @param id - The ID to validate
 * @returns Boolean indicating if ID is valid
 */
export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

/**
 * Handles database connection errors
 * Provides specific error handling for connection issues
 *
 * @param error - The connection error
 * @returns Object with error details
 */
export function handleConnectionError(error: any): { message: string; retryable: boolean } {
  // Check if error is retryable
  const isRetryable =
    error.name === "MongoNetworkError" || (error.code && [6, 7, 89, 91, 310, 313].includes(error.code))

  let message = "Failed to connect to the database."

  if (error.name === "MongoNetworkError") {
    message = "Network error connecting to the database. Please check your connection."
  } else if (error.name === "MongoServerSelectionError") {
    message = "Unable to select a MongoDB server. The service may be down."
  } else if (error.name === "MongoParseError") {
    message = "Invalid MongoDB connection string."
  }

  return {
    message,
    retryable: isRetryable,
  }
}

