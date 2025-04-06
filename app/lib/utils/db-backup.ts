import clientPromise from "@/app/lib/mongodb"
import fs from "fs"
import path from "path"
import { promisify } from "util"

const writeFileAsync = promisify(fs.writeFile)
const mkdirAsync = promisify(fs.mkdir)

/**
 * Creates a backup of the applications collection
 * This should be run on a schedule using a cron job
 */
export async function backupApplicationsCollection() {
  try {
    console.log("Starting database backup...")

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("indo_african_scholarships")

    // Get all applications
    const applications = await db.collection("applications").find({}).toArray()

    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), "backups")
    try {
      await mkdirAsync(backupDir, { recursive: true })
    } catch (err) {
      // Directory might already exist
    }

    // Create backup file with timestamp
    const timestamp = new Date().toISOString().replace(/:/g, "-")
    const backupPath = path.join(backupDir, `applications_backup_${timestamp}.json`)

    // Write data to file
    await writeFileAsync(backupPath, JSON.stringify(applications, null, 2), "utf8")

    console.log(`Backup completed successfully: ${backupPath}`)
    return {
      success: true,
      message: `Backup completed successfully: ${backupPath}`,
      count: applications.length,
    }
  } catch (error) {
    console.error("Error creating database backup:", error)
    return {
      success: false,
      message: "Failed to create database backup",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

