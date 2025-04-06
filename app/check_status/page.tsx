"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Clock, Search } from "lucide-react"

export default function CheckStatusPage() {
  const [applicationId, setApplicationId] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/check-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applicationId, contactNumber }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to check application status")
      }

      setResult(data.data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-12 w-12 text-green-500" />
      case "Rejected":
        return <AlertCircle className="h-12 w-12 text-red-500" />
      case "Pending":
      case "Under Review":
      default:
        return <Clock className="h-12 w-12 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-500"
      case "Rejected":
        return "text-red-500"
      case "Pending":
      case "Under Review":
      default:
        return "text-yellow-500"
    }
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
              <CardDescription className="text-gray-400">Enter your details below to check your status</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="applicationId" className="block text-white font-medium mb-2">
                    Application ID
                  </label>
                  <Input
                    id="applicationId"
                    placeholder="e.g., IAF-2025-12345"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block text-white font-medium mb-2">
                    Contact Number
                  </label>
                  <Input
                    id="contactNumber"
                    placeholder="Enter the phone number used in application"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white"
                >
                  {isLoading ? "Checking..." : "Check Status"}
                  {!isLoading && <Search className="ml-2 h-4 w-4" />}
                </Button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
                  <p className="text-red-400 text-center">{error}</p>
                </div>
              )}

              {result && (
                <div className="mt-6 p-6 bg-gray-700/30 border border-gray-600 rounded-lg">
                  <div className="flex justify-center mb-4">{getStatusIcon(result.status)}</div>
                  <h3 className="text-xl font-bold text-white text-center mb-4">
                    Status: <span className={getStatusColor(result.status)}>{result.status}</span>
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <p>
                      <span className="font-semibold">Name:</span> {result.name}
                    </p>
                    <p>
                      <span className="font-semibold">Application ID:</span> {result.applicationId}
                    </p>
                    <p>
                      <span className="font-semibold">Program:</span> {result.programType}
                    </p>
                    <p>
                      <span className="font-semibold">First Preference:</span> {result.firstPreference}
                    </p>
                    <p>
                      <span className="font-semibold">Submitted On:</span>{" "}
                      {new Date(result.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

