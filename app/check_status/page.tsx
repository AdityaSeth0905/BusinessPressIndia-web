"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Clock, Info } from "lucide-react"
import { checkApplicationStatus } from "../actions/check-application-status"
import Link from "next/link"

/**
 * Status Check Page Component
 *
 * Allows applicants to check the status of their scholarship application
 * using their application ID and contact number
 */
export default function CheckStatusPage() {
  const [applicationId, setApplicationId] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  /**
   * Handles form submission to check application status
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      // Validate inputs
      if (!applicationId.match(/^IAF-\d{4}-\d{5}$/)) {
        setError("Please enter a valid application ID (format: IAF-YYYY-XXXXX)")
        setIsLoading(false)
        return
      }

      if (!contactNumber.match(/^[+]?[0-9\s-()]{10,15}$/)) {
        setError("Please enter a valid contact number")
        setIsLoading(false)
        return
      }

      // Create form data
      const formData = new FormData()
      formData.append("applicationId", applicationId)
      formData.append("contactNumber", contactNumber)

      // Submit to server action
      const response = await checkApplicationStatus(formData)

      if (response.success) {
        setResult(response.data)
      } else {
        setError(response.message || "Failed to check application status")
      }
    } catch (err) {
      console.error("Error checking status:", err)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Renders the status badge based on application status
   */
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </div>
        )
      case "Under Review":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
            <Info className="w-3 h-3 mr-1" />
            Under Review
          </div>
        )
      case "Approved":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </div>
        )
      case "Rejected":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-500">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejected
          </div>
        )
      default:
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-500">
            {status}
          </div>
        )
    }
  }

  /**
   * Formats a date string for display
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Check Application Status</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enter your application ID and contact number to check the status of your scholarship application.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Application Status</CardTitle>
              <CardDescription className="text-gray-300">Enter your details below to check your status</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="applicationId" className="text-white font-medium">
                    Application ID
                  </label>
                  <Input
                    id="applicationId"
                    placeholder="e.g., IAF-2023-12345"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactNumber" className="text-white font-medium">
                    Contact Number
                  </label>
                  <Input
                    id="contactNumber"
                    placeholder="Enter the mobile number used in application"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white"
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Checking...
                    </>
                  ) : (
                    "Check Status"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card className="mt-8 bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Application Details</span>
                  {renderStatusBadge(result.status)}
                </CardTitle>
                <CardDescription className="text-gray-300">Application ID: {result.applicationId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-gray-400 text-sm">Applicant Name</h3>
                  <p className="text-white font-medium">{result.name}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Program Type</h3>
                  <p className="text-white font-medium">{result.programType}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Submitted On</h3>
                  <p className="text-white font-medium">{formatDate(result.submittedAt)}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Last Updated</h3>
                  <p className="text-white font-medium">{formatDate(result.lastUpdated)}</p>
                </div>
                {result.statusDetails && (
                  <div>
                    <h3 className="text-gray-400 text-sm">Status Details</h3>
                    <p className="text-white font-medium">{result.statusDetails}</p>
                  </div>
                )}
                {result.expectedResponseDate && (
                  <div>
                    <h3 className="text-gray-400 text-sm">Expected Response Date</h3>
                    <p className="text-white font-medium">{formatDate(result.expectedResponseDate)}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-gray-400 text-sm">
                  If you have any questions, please{" "}
                  <Link href="/contact" className="text-brand-orange hover:underline">
                    contact us
                  </Link>
                  .
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

