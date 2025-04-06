import { MongoClient, ServerApiVersion } from "mongodb"

/**
 * MongoDB connection string from environment variable
 * Falls back to the provided URI if environment variable is not set
 */
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:123@formcluster.gorz4nj.mongodb.net/?retryWrites=true&w=majority&appName=FormCluster"

/**
 * MongoDB client options with latest server API version
 * Using the latest stable API version with strict mode and deprecation errors
 */
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10, // Maximum number of connections in the connection pool
  minPoolSize: 5, // Minimum number of connections in the connection pool
  connectTimeoutMS: 30000, // Connection timeout (30 seconds)
  socketTimeoutMS: 45000, // Socket timeout (45 seconds)
}

// Global variable to cache the MongoDB client connection
let client: MongoClient
let clientPromise: Promise<MongoClient>

/**
 * In development mode, use a global variable to preserve the connection across hot-reloads
 * This prevents creating a new connection on every reload during development
 */
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect().catch((err) => {
      console.error("Failed to connect to MongoDB:", err)
      throw err
    })
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect().catch((err) => {
    console.error("Failed to connect to MongoDB in production:", err)
    throw err
  })
}

/**
 * Export a module-scoped MongoClient promise
 * By doing this in a separate module, the client can be shared across functions
 */
export default clientPromise

/**
 * Helper function to check if the MongoDB connection is healthy
 * Can be used for health checks and monitoring
 */
export async function checkMongoDBConnection() {
  try {
    const client = await clientPromise
    // Ping the database to check connection
    await client.db("admin").command({ ping: 1 })
    return { connected: true, message: "Successfully connected to MongoDB" }
  } catch (error) {
    console.error("MongoDB connection check failed:", error)
    return {
      connected: false,
      message: "Failed to connect to MongoDB",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

