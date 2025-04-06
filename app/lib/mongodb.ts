import { MongoClient, ServerApiVersion } from "mongodb"

// MongoDB connection string from environment variable
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:123@formcluster.gorz4nj.mongodb.net/?retryWrites=true&w=majority&appName=FormCluster"

// MongoDB client options with latest server API version
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

// Global variable to cache the MongoDB client connection
let client: MongoClient
let clientPromise: Promise<MongoClient>

// In development mode, use a global variable to preserve the connection across hot-reloads
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

