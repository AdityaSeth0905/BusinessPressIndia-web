import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { applicationId, contactNumber } = await request.json()

    if (!applicationId || !contactNumber) {
      return NextResponse.json(
        { success: false, message: "Application ID and contact number are required" },
        { status: 400 },
      )
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("indo_african_scholarships")

    // Find the application
    const application = await db.collection("applications").findOne({
      applicationId,
      $or: [{ studentMobile: contactNumber }, { fatherMobile: contactNumber }, { motherMobile: contactNumber }],
    })

    if (!application) {
      return NextResponse.json(
        { success: false, message: "No application found with the provided details" },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        applicationId: application.applicationId,
        name: `${application.firstName} ${application.lastName}`,
        status: application.status,
        programType: application.programType,
        firstPreference: application.firstPreference,
        submittedAt: application.submittedAt,
      },
    })
  } catch (error) {
    console.error("Error checking application status:", error)
    return NextResponse.json({ success: false, message: "Failed to check application status" }, { status: 500 })
  }
}

