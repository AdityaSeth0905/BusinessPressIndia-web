"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, ChevronLeft, CheckCircle, Upload } from "lucide-react"

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission to a backend here
    setFormSubmitted(true)
  }

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const renderForm = () => {
    if (formSubmitted) {
      return (
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-brand-orange/20 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-brand-orange" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Thank you for submitting your application for the Indo-African Scholarship program. Your application has
            been received and is under review.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Your Application ID: <span className="font-bold text-brand-orange">IAF-2025-87632</span>
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Please save this ID for future reference. You can use it to check the status of your application.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-brand-orange hover:bg-orange-600 text-white">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      )
    }

    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="full-name" className="block text-white font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    id="full-name"
                    placeholder="Enter your full name"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="father-name" className="block text-white font-medium mb-2">
                    Father/Guardian Name
                  </label>
                  <Input
                    id="father-name"
                    placeholder="Enter father/guardian name"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="mother-name" className="block text-white font-medium mb-2">
                    Mother Name
                  </label>
                  <Input
                    id="mother-name"
                    placeholder="Enter mother name"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="dob" className="block text-white font-medium mb-2">
                    Date of Birth
                  </label>
                  <Input id="dob" type="date" required className="bg-gray-700/50 border-gray-600 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nationality" className="block text-white font-medium mb-2">
                    Nationality
                  </label>
                  <Select>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue placeholder="Select your nationality" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="kenya">Kenya</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="ethiopia">Ethiopia</SelectItem>
                      <SelectItem value="southafrica">South Africa</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-white font-medium mb-2">
                    Gender
                  </label>
                  <RadioGroup defaultValue="male" className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" className="text-brand-orange" />
                      <Label htmlFor="male" className="text-white">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" className="text-brand-orange" />
                      <Label htmlFor="female" className="text-white">
                        Female
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" className="text-brand-orange" />
                      <Label htmlFor="other" className="text-white">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="mother-tongue" className="block text-white font-medium mb-2">
                    Mother Tongue
                  </label>
                  <Input
                    id="mother-tongue"
                    placeholder="Enter your mother tongue"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="english-prof" className="block text-white font-medium mb-2">
                    English Proficiency
                  </label>
                  <Select>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue placeholder="Select your proficiency level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="fluent">Fluent</SelectItem>
                      <SelectItem value="native">Native</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-white font-medium mb-2">
                  Address
                </label>
                <Textarea
                  id="address"
                  placeholder="Enter your full address"
                  required
                  className="bg-gray-700/50 border-gray-600 text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">
                    Contact Phone
                  </label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={nextStep} className="bg-brand-orange hover:bg-orange-600 text-white">
                  Next Step <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Academic Information</h2>
            <div className="space-y-6">
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">10th Standard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="10th-score" className="block text-white font-medium mb-2">
                      10th Standard Score (%)
                    </label>
                    <Input
                      id="10th-score"
                      type="number"
                      placeholder="Enter your percentage"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="10th-year" className="block text-white font-medium mb-2">
                      Year of Passing
                    </label>
                    <Input
                      id="10th-year"
                      type="number"
                      placeholder="Enter year"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="10th-subjects" className="block text-white font-medium mb-2">
                    Subjects
                  </label>
                  <Input
                    id="10th-subjects"
                    placeholder="Enter subjects (comma separated)"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="10th-board" className="block text-white font-medium mb-2">
                    School / Board
                  </label>
                  <Input
                    id="10th-board"
                    placeholder="Enter school and board name"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">12th Standard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="12th-score" className="block text-white font-medium mb-2">
                      12th Standard Score (%)
                    </label>
                    <Input
                      id="12th-score"
                      type="number"
                      placeholder="Enter your percentage"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="12th-year" className="block text-white font-medium mb-2">
                      Year of Passing
                    </label>
                    <Input
                      id="12th-year"
                      type="number"
                      placeholder="Enter year"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="12th-subjects" className="block text-white font-medium mb-2">
                    Subjects
                  </label>
                  <Input
                    id="12th-subjects"
                    placeholder="Enter subjects (comma separated)"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="12th-board" className="block text-white font-medium mb-2">
                    School / Board
                  </label>
                  <Input
                    id="12th-board"
                    placeholder="Enter school and board name"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Higher Education (if applicable)</h3>

                <Tabs defaultValue="undergrad">
                  <TabsList className="bg-gray-700/50 border-gray-600">
                    <TabsTrigger
                      value="undergrad"
                      className="data-[state=active]:bg-brand-orange data-[state=active]:text-black"
                    >
                      Undergraduate
                    </TabsTrigger>
                    <TabsTrigger
                      value="postgrad"
                      className="data-[state=active]:bg-brand-orange data-[state=active]:text-black"
                    >
                      Postgraduate
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="undergrad" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ug-stream" className="block text-white font-medium mb-2">
                          Undergraduate Stream
                        </label>
                        <Input
                          id="ug-stream"
                          placeholder="E.g., Engineering, Arts, Science"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="ug-year" className="block text-white font-medium mb-2">
                          Year of Passing
                        </label>
                        <Input
                          id="ug-year"
                          type="number"
                          placeholder="Enter year"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ug-subjects" className="block text-white font-medium mb-2">
                        Subjects
                      </label>
                      <Input
                        id="ug-subjects"
                        placeholder="Enter major subjects"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="ug-university" className="block text-white font-medium mb-2">
                        University
                      </label>
                      <Input
                        id="ug-university"
                        placeholder="Enter university name"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="postgrad" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="pg-stream" className="block text-white font-medium mb-2">
                          Postgraduate Stream
                        </label>
                        <Input
                          id="pg-stream"
                          placeholder="E.g., MBA, M.Tech, MA"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="pg-year" className="block text-white font-medium mb-2">
                          Year of Passing
                        </label>
                        <Input
                          id="pg-year"
                          type="number"
                          placeholder="Enter year"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pg-subjects" className="block text-white font-medium mb-2">
                        Subjects
                      </label>
                      <Input
                        id="pg-subjects"
                        placeholder="Enter specialization subjects"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="pg-university" className="block text-white font-medium mb-2">
                        University
                      </label>
                      <Input
                        id="pg-university"
                        placeholder="Enter university name"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={prevStep} variant="outline" className="border-white text-white hover:bg-white/10">
                  <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
                <Button onClick={nextStep} className="bg-brand-orange hover:bg-orange-600 text-white">
                  Next Step <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Program Selection & Documents</h2>
            <div className="space-y-6">
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Program Preferences</h3>
                <p className="text-gray-300 mb-4">
                  Select the program type and specific course you wish to apply for. You can select up to three
                  preferences.
                </p>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="program-type" className="block text-white font-medium mb-2">
                      Program Type
                    </label>
                    <Select>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="Select program type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="skill">Skill Courses</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate Degree</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate Degree</SelectItem>
                        <SelectItem value="doctoral">Doctoral Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="preference-1" className="block text-white font-medium mb-2">
                      First Preference
                    </label>
                    <Input
                      id="preference-1"
                      placeholder="Enter your first course preference"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="preference-2" className="block text-white font-medium mb-2">
                      Second Preference (Optional)
                    </label>
                    <Input
                      id="preference-2"
                      placeholder="Enter your second course preference"
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="preference-3" className="block text-white font-medium mb-2">
                      Third Preference (Optional)
                    </label>
                    <Input
                      id="preference-3"
                      placeholder="Enter your third course preference"
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Document Upload</h3>
                <p className="text-gray-300 mb-6">
                  Please upload the following documents in PDF or JPG format. Each file should not exceed 2MB.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Identification Document (Passport/ID Card)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700/30 border-gray-600 hover:bg-gray-700/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">PDF or JPG (MAX. 2MB)</p>
                        </div>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">10th Standard Certificate & Marksheet</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700/30 border-gray-600 hover:bg-gray-700/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">PDF or JPG (MAX. 2MB)</p>
                        </div>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">12th Standard Certificate & Marksheet</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700/30 border-gray-600 hover:bg-gray-700/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">PDF or JPG (MAX. 2MB)</p>
                        </div>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Graduation Certificate (if applicable)</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700/30 border-gray-600 hover:bg-gray-700/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">PDF or JPG (MAX. 2MB)</p>
                        </div>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-orange/10 rounded-lg border border-brand-orange/30">
                    <p className="text-gray-200 text-sm">
                      Note: All documents must be clear and legible. Incomplete or unclear documents may delay your
                      application process.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button onClick={prevStep} variant="outline" className="border-white text-white hover:bg-white/10">
                  <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
                <Button onClick={handleSubmit} className="bg-brand-orange hover:bg-orange-600 text-white">
                  Submit Application
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return
  ;<div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Scholarship Application</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Complete the application form below to apply for the Indo-African Scholarship program.
        </p>
      </div>

      {!formSubmitted && (
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className={`flex flex-col items-center ${step >= 1 ? "text-brand-orange" : "text-gray-500"}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 1 ? "bg-brand-orange text-black" : "bg-gray-700 text-gray-400"}`}
              >
                1
              </div>
              <span className="text-sm">Personal Info</span>
            </div>

            <div className={`w-24 h-1 ${step >= 2 ? "bg-brand-orange" : "bg-gray-700"}`}></div>

            <div className={`flex flex-col items-center ${step >= 2 ? "text-brand-orange" : "text-gray-500"}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 2 ? "bg-brand-orange text-black" : "bg-gray-700 text-gray-400"}`}
              >
                2
              </div>
              <span className="text-sm">Academic Info</span>
            </div>

            <div className={`w-24 h-1 ${step >= 3 ? "bg-brand-orange" : "bg-gray-700"}`}></div>

            <div className={`flex flex-col items-center ${step >= 3 ? "text-brand-orange" : "text-gray-500"}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 3 ? "bg-brand-orange text-black" : "bg-gray-700 text-gray-400"}`}
              >
                3
              </div>
              <span className="text-sm">Program & Documents</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">{renderForm()}</div>
      </div>
    </div>
  </div>
}

