/**
 * Handles MongoDB errors and returns user-friendly messages
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

      default:
        console.error("MongoDB error:", error)
        return "A database error occurred. Please try again later."
    }
  }

  // Check for network or timeout errors
  if (error.name === "MongoNetworkError" || error.message?.includes("timeout")) {
    return "Network error connecting to the database. Please check your connection and try again."
  }

  // Default error message
  console.error("Unhandled MongoDB error:", error)
  return "An unexpected error occurred. Please try again later."
}

/**
 * Logs database operations for auditing
 * @param operation - The database operation being performed
 * @param collection - The collection being operated on
 * @param details - Additional details about the operation
 */
export function logDatabaseOperation(operation: string, collection: string, details: any): void {
  const timestamp = new Date().toISOString()
  console.log(`[DB_AUDIT][${timestamp}] ${operation} on ${collection}: ${JSON.stringify(details)}`)
}

