"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight, ChevronLeft, CheckCircle, Upload, Plus, Trash2, AlertCircle, Info } from "lucide-react"
import { useForm, useFieldArray, Controller, useWatch, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { submitApplication } from "@/app/actions/submit-application"
import { applicationSchema, type ApplicationFormData } from "@/app/lib/schemas/application-schema"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

/**
 * ApplyPage Component
 *
 * A multi-step form for scholarship applications with comprehensive validation,
 * error handling, and MongoDB integration.
 */
export default function ApplyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const programType = searchParams.get("program") || ""

  // Form state management
  const [step, setStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const formRef = useRef<HTMLFormElement>(null)

  // Initialize the form with react-hook-form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isDirty, dirtyFields },
    trigger,
    getValues,
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      programType: (programType as "Skill Courses" | "Diploma" | "Undergraduate Degree" | "Postgraduate Degree" | "Doctoral Program") || "Undergraduate Degree",
      hostelRequired: "Yes",
      siblings: [],
      entranceTests: [],
      studentDeclaration: false,
      parentDeclaration: false,
    },
    mode: "onChange", // Validate on change for better user experience
  })

  // Watch form values for conditional rendering
  const watch = useWatch({ control })
  const currentlyEnrolled = useWatch({
    control,
    name: "currentlyEnrolled",
    defaultValue: "No",
  })

  // Set up field arrays for siblings and entrance tests
  const {
    fields: siblingFields,
    append: appendSibling,
    remove: removeSibling,
  } = useFieldArray({
    control,
    name: "siblings",
  })

  const {
    fields: entranceTestFields,
    append: appendEntranceTest,
    remove: removeEntranceTest,
  } = useFieldArray({
    control,
    name: "entranceTests",
  })

  // Initialize form with program type from URL if available
  useEffect(() => {
    if (programType) {
      // Validate that the program type is one of the allowed values
      const validProgramTypes = [
        "Skill Courses",
        "Diploma",
        "Undergraduate Degree",
        "Postgraduate Degree",
        "Doctoral Program",
      ]

      if (validProgramTypes.includes(programType)) {
        setValue("programType", programType as any)
      }
    }
  }, [programType, setValue])

  /**
   * Form submission handler
   * Processes form data and submits to the server
   */
  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData(formRef.current!)

      // Add form data that might not be captured by the form element
      Object.entries(data).forEach(([key, value]) => {
        // Skip file inputs as they're already in the FormData
        if (key !== "documents" && value !== undefined) {
          if (Array.isArray(value)) {
            // Handle arrays
            formData.append(key, JSON.stringify(value))
          } else if (typeof value === "object" && value !== null) {
            // Handle objects
            formData.append(key, JSON.stringify(value))
          } else {
            // Handle primitive values
            formData.append(key, String(value))
          }
        }
      })

      // Submit the form data to the server action
      const result = await submitApplication(formData)

      if (result.success) {
        setApplicationId(result.applicationId || "")
        setFormSubmitted(true)
        window.scrollTo(0, 0)

        // Store application ID in localStorage for reference
        try {
          localStorage.setItem("lastApplicationId", result.applicationId || "")
        } catch (e) {
          // Ignore localStorage errors
        }
      } else {
        setErrorMessage(result.message || "Failed to submit application")
        setShowErrorDialog(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage(
        error instanceof Error ? `Error: ${error.message}` : "An unexpected error occurred. Please try again.",
      )
      setShowErrorDialog(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Validates the current step and proceeds to the next if valid
   */
  const nextStep = async () => {
    let fieldsToValidate: string[] = []

    // Determine which fields to validate based on current step
    switch (step) {
      case 1: // Personal Information
        fieldsToValidate = [
          "firstName",
          "lastName",
          "fatherName",
          "motherName",
          "dob",
          "sex",
          "govtIdNumber",
          "nationality",
          "state",
          "city",
          "district",
          "pincode",
          "residentialAddress",
          "studentMobile",
          "fatherMobile",
          "studentEmail",
        ]
        break
      case 2: // Family & Financial Information
        fieldsToValidate = ["fatherOccupation", "fatherIncome", "fatherIncomeCurrency"]
        break
      case 3: // Academic Information
        fieldsToValidate = [
          "currentlyEnrolled",
          "tenthScore",
          "tenthSubjects",
          "tenthBoard",
          "tenthYear",
          "twelfthScore",
          "twelfthSubjects",
          "twelfthBoard",
          "twelfthYear",
        ]
        break
      case 4: // Program Selection & Documents
        fieldsToValidate = [
          "programType",
          "firstPreference",
          "hostelRequired",
          "studentDeclaration",
          "parentDeclaration",
        ]
        break
    }

    // Validate the fields for the current step
    const isStepValid = await trigger(fieldsToValidate as any)

    if (!isStepValid) {
      // Collect all errors for the current step
      const currentErrors: Record<string, string[]> = {}

      Object.entries(errors).forEach(([field, error]) => {
        if (fieldsToValidate.includes(field)) {
          currentErrors[field] = [error.message as string]
        }
      })

      setFormErrors(currentErrors)

      // Scroll to the first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]')
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
      }

      return
    }

    // Clear errors for this step
    setFormErrors({})

    // Move to the next step
    setStep((prevStep) => prevStep + 1)
    window.scrollTo(0, 0)
  }

  /**
   * Moves to the previous step
   */
  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  /**
   * Renders the appropriate form step or success message
   */
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
            Your Application ID: <span className="font-bold text-brand-orange">{applicationId}</span>
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

            {/* Display any form errors */}
            {Object.keys(formErrors).length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Please correct the errors below before proceeding.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-white font-medium mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    {...register("firstName")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.firstName ? "border-red-500" : ""}`}
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-white font-medium mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    {...register("lastName")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.lastName ? "border-red-500" : ""}`}
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fatherName" className="block text-white font-medium mb-2">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="fatherName"
                    placeholder="Enter father's name"
                    {...register("fatherName")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.fatherName ? "border-red-500" : ""}`}
                    aria-invalid={errors.fatherName ? "true" : "false"}
                  />
                  {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName.message}</p>}
                </div>

                <div>
                  <label htmlFor="motherName" className="block text-white font-medium mb-2">
                    Mother's Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="motherName"
                    placeholder="Enter mother's name"
                    {...register("motherName")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.motherName ? "border-red-500" : ""}`}
                    aria-invalid={errors.motherName ? "true" : "false"}
                  />
                  {errors.motherName && <p className="text-red-500 text-sm mt-1">{errors.motherName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="dob" className="block text-white font-medium mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="dob"
                    type="date"
                    {...register("dob")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.dob ? "border-red-500" : ""}`}
                    aria-invalid={errors.dob ? "true" : "false"}
                    // Set max date to today to prevent future dates
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
                </div>

                <div>
                  <label htmlFor="sex" className="block text-white font-medium mb-2">
                    Sex <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="sex"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6"
                        aria-invalid={errors.sex ? "true" : "false"}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Male" id="male" className="text-brand-orange" />
                          <Label htmlFor="male" className="text-white">
                            Male
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Female" id="female" className="text-brand-orange" />
                          <Label htmlFor="female" className="text-white">
                            Female
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Other" id="other" className="text-brand-orange" />
                          <Label htmlFor="other" className="text-white">
                            Other
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>}
                </div>

                <div>
                  <label htmlFor="bloodGroup" className="block text-white font-medium mb-2">
                    Blood Group
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Optional field</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Input
                    id="bloodGroup"
                    placeholder="e.g., A+, B-, O+"
                    {...register("bloodGroup")}
                    {...register("bloodGroup")}
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="passportNumber" className="block text-white font-medium mb-2">
                    Passport Number
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Optional field</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Input
                    id="passportNumber"
                    placeholder="Enter passport number (if available)"
                    {...register("passportNumber")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.passportNumber ? "border-red-500" : ""}`}
                    aria-invalid={errors.passportNumber ? "true" : "false"}
                  />
                  {errors.passportNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.passportNumber.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="govtIdNumber" className="block text-white font-medium mb-2">
                    Government ID Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="govtIdNumber"
                    placeholder="Enter government ID number"
                    {...register("govtIdNumber")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.govtIdNumber ? "border-red-500" : ""}`}
                    aria-invalid={errors.govtIdNumber ? "true" : "false"}
                  />
                  {errors.govtIdNumber && <p className="text-red-500 text-sm mt-1">{errors.govtIdNumber.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nationality" className="block text-white font-medium mb-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="nationality"
                    placeholder="Enter your nationality"
                    {...register("nationality")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.nationality ? "border-red-500" : ""}`}
                    aria-invalid={errors.nationality ? "true" : "false"}
                  />
                  {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-white font-medium mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="state"
                    placeholder="Enter your state"
                    {...register("state")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.state ? "border-red-500" : ""}`}
                    aria-invalid={errors.state ? "true" : "false"}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block text-white font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    {...register("city")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.city ? "border-red-500" : ""}`}
                    aria-invalid={errors.city ? "true" : "false"}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>

                <div>
                  <label htmlFor="district" className="block text-white font-medium mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="district"
                    placeholder="Enter your district"
                    {...register("district")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.district ? "border-red-500" : ""}`}
                    aria-invalid={errors.district ? "true" : "false"}
                  />
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-white font-medium mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="pincode"
                    placeholder="Enter your pincode"
                    {...register("pincode")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.pincode ? "border-red-500" : ""}`}
                    aria-invalid={errors.pincode ? "true" : "false"}
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="residentialAddress" className="block text-white font-medium mb-2">
                  Residential Address (Permanent) <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="residentialAddress"
                  placeholder="Enter your permanent address"
                  {...register("residentialAddress")}
                  className={`bg-gray-700/50 border-gray-600 text-white min-h-[100px] ${errors.residentialAddress ? "border-red-500" : ""}`}
                  aria-invalid={errors.residentialAddress ? "true" : "false"}
                />
                {errors.residentialAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.residentialAddress.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="secondaryAddress" className="block text-white font-medium mb-2">
                  Secondary Address
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Optional field</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                <Textarea
                  id="secondaryAddress"
                  placeholder="Enter your secondary address (if applicable)"
                  {...register("secondaryAddress")}
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="studentMobile" className="block text-white font-medium mb-2">
                    Mobile Number (Student) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="studentMobile"
                    placeholder="Enter your mobile number"
                    {...register("studentMobile")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.studentMobile ? "border-red-500" : ""}`}
                    aria-invalid={errors.studentMobile ? "true" : "false"}
                  />
                  {errors.studentMobile && <p className="text-red-500 text-sm mt-1">{errors.studentMobile.message}</p>}
                </div>

                <div>
                  <label htmlFor="fatherMobile" className="block text-white font-medium mb-2">
                    Mobile Number of Father/Guardian <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="fatherMobile"
                    placeholder="Enter father's mobile number"
                    {...register("fatherMobile")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.fatherMobile ? "border-red-500" : ""}`}
                    aria-invalid={errors.fatherMobile ? "true" : "false"}
                  />
                  {errors.fatherMobile && <p className="text-red-500 text-sm mt-1">{errors.fatherMobile.message}</p>}
                </div>

                <div>
                  <label htmlFor="motherMobile" className="block text-white font-medium mb-2">
                    Mobile Number of Mother/Guardian
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Optional field</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Input
                    id="motherMobile"
                    placeholder="Enter mother's mobile number"
                    {...register("motherMobile")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.motherMobile ? "border-red-500" : ""}`}
                    aria-invalid={errors.motherMobile ? "true" : "false"}
                  />
                  {errors.motherMobile && <p className="text-red-500 text-sm mt-1">{errors.motherMobile.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentEmail" className="block text-white font-medium mb-2">
                    Student's Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="studentEmail"
                    type="email"
                    placeholder="Enter your email address"
                    {...register("studentEmail")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.studentEmail ? "border-red-500" : ""}`}
                    aria-invalid={errors.studentEmail ? "true" : "false"}
                  />
                  {errors.studentEmail && <p className="text-red-500 text-sm mt-1">{errors.studentEmail.message}</p>}
                </div>

                <div>
                  <label htmlFor="parentEmail" className="block text-white font-medium mb-2">
                    Parent's Email (or Guardian)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Optional field</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Input
                    id="parentEmail"
                    type="email"
                    placeholder="Enter parent's email address"
                    {...register("parentEmail")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.parentEmail ? "border-red-500" : ""}`}
                    aria-invalid={errors.parentEmail ? "true" : "false"}
                  />
                  {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail.message}</p>}
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={nextStep} className="bg-brand-orange hover:bg-orange-600 text-white" type="button">
                  Next Step <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Family & Financial Information</h2>

            {/* Display any form errors */}
            {Object.keys(formErrors).length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Please correct the errors below before proceeding.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fatherOccupation" className="block text-white font-medium mb-2">
                    Father's Occupation <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="fatherOccupation"
                    placeholder="Enter father's occupation"
                    {...register("fatherOccupation")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.fatherOccupation ? "border-red-500" : ""}`}
                    aria-invalid={errors.fatherOccupation ? "true" : "false"}
                  />
                  {errors.fatherOccupation && (
                    <p className="text-red-500 text-sm mt-1">{errors.fatherOccupation.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="motherOccupation" className="block text-white font-medium mb-2">
                    Mother's Occupation
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Optional field</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Input
                    id="motherOccupation"
                    placeholder="Enter mother's occupation"
                    {...register("motherOccupation")}
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fatherIncome" className="block text-white font-medium mb-2">
                    Annual Income of Father (from all sources) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="fatherIncome"
                      placeholder="Enter annual income"
                      {...register("fatherIncome")}
                      className={`bg-gray-700/50 border-gray-600 text-white flex-1 ${errors.fatherIncome ? "border-red-500" : ""}`}
                      aria-invalid={errors.fatherIncome ? "true" : "false"}
                    />
                    <Controller
                      name="fatherIncomeCurrency"
                      control={control}
                      defaultValue="INR"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white w-28">
                            <SelectValue placeholder="Currency" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="INR">INR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="NGN">NGN</SelectItem>
                            <SelectItem value="ZAR">ZAR</SelectItem>
                            <SelectItem value="KES">KES</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.fatherIncome && <p className="text-red-500 text-sm mt-1">{errors.fatherIncome.message}</p>}
                </div>

                <div>
                  <label htmlFor="motherIncome" className="block text-white font-medium mb-2">
                    Annual Income of Mother (from all sources)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Optional field</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="motherIncome"
                      placeholder="Enter annual income"
                      {...register("motherIncome")}
                      className={`bg-gray-700/50 border-gray-600 text-white flex-1 ${errors.motherIncome ? "border-red-500" : ""}`}
                      aria-invalid={errors.motherIncome ? "true" : "false"}
                    />
                    <Controller
                      name="motherIncomeCurrency"
                      control={control}
                      defaultValue="INR"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white w-28">
                            <SelectValue placeholder="Currency" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="INR">INR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="NGN">NGN</SelectItem>
                            <SelectItem value="ZAR">ZAR</SelectItem>
                            <SelectItem value="KES">KES</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.motherIncome && <p className="text-red-500 text-sm mt-1">{errors.motherIncome.message}</p>}
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Sibling Details</h3>
                  <Button
                    type="button"
                    onClick={() => appendSibling({ relation: "Brother", name: "", school: "", class: "" })}
                    variant="outline"
                    size="sm"
                    className="border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Sibling
                  </Button>
                </div>

                {siblingFields.length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    No siblings added. Click "Add Sibling" to add details.
                  </p>
                )}

                {siblingFields.map((field, index) => (
                  <div key={field.id} className="bg-gray-700/30 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-white font-medium">Sibling {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeSibling(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Relation</label>
                        <Controller
                          name={`siblings.${index}.relation`}
                          control={control}
                          defaultValue="Brother"
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                                <SelectValue placeholder="Select relation" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="Brother">Brother</SelectItem>
                                <SelectItem value="Sister">Sister</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Name</label>
                        <Input
                          {...register(`siblings.${index}.name`)}
                          placeholder="Enter sibling's name"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">School/College</label>
                        <Input
                          {...register(`siblings.${index}.school`)}
                          placeholder="Enter school/college name"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Class/Year</label>
                        <Input
                          {...register(`siblings.${index}.class`)}
                          placeholder="Enter class/year"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  type="button"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
                <Button onClick={nextStep} className="bg-brand-orange hover:bg-orange-600 text-white" type="button">
                  Next Step <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Academic Information</h2>

            {/* Display any form errors */}
            {Object.keys(formErrors).length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Please correct the errors below before proceeding.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Current Enrollment</h3>
                <div className="mb-4">
                  <label className="block text-white font-medium mb-2">Are you currently enrolled?</label>
                  <Controller
                    name="currentlyEnrolled"
                    control={control}
                    defaultValue="No"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6"
                        aria-invalid={errors.currentlyEnrolled ? "true" : "false"}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" id="enrolled-yes" className="text-brand-orange" />
                          <Label htmlFor="enrolled-yes" className="text-white">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id="enrolled-no" className="text-brand-orange" />
                          <Label htmlFor="enrolled-no" className="text-white">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.currentlyEnrolled && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentlyEnrolled.message}</p>
                  )}
                </div>

                {currentlyEnrolled === "Yes" && (
                  <div>
                    <label htmlFor="currentInstitution" className="block text-white font-medium mb-2">
                      Specify Institution
                    </label>
                    <Input
                      id="currentInstitution"
                      placeholder="Enter institution name"
                      {...register("currentInstitution")}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                )}
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">10th Standard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tenthScore" className="block text-white font-medium mb-2">
                      10th Standard Score (%) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="tenthScore"
                      placeholder="Enter your percentage"
                      {...register("tenthScore")}
                      className={`bg-gray-700/50 border-gray-600 text-white ${errors.tenthScore ? "border-red-500" : ""}`}
                      aria-invalid={errors.tenthScore ? "true" : "false"}
                    />
                    {errors.tenthScore && <p className="text-red-500 text-sm mt-1">{errors.tenthScore.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="tenthYear" className="block text-white font-medium mb-2">
                      Year of Passing <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="tenthYear"
                      placeholder="Enter year (e.g., 2020)"
                      {...register("tenthYear")}
                      className={`bg-gray-700/50 border-gray-600 text-white ${errors.tenthYear ? "border-red-500" : ""}`}
                      aria-invalid={errors.tenthYear ? "true" : "false"}
                    />
                    {errors.tenthYear && <p className="text-red-500 text-sm mt-1">{errors.tenthYear.message}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="tenthSubjects" className="block text-white font-medium mb-2">
                    Subjects <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="tenthSubjects"
                    placeholder="Enter subjects (comma separated)"
                    {...register("tenthSubjects")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.tenthSubjects ? "border-red-500" : ""}`}
                    aria-invalid={errors.tenthSubjects ? "true" : "false"}
                  />
                  {errors.tenthSubjects && <p className="text-red-500 text-sm mt-1">{errors.tenthSubjects.message}</p>}
                </div>

                <div className="mt-4">
                  <label htmlFor="tenthBoard" className="block text-white font-medium mb-2">
                    School / Board <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="tenthBoard"
                    placeholder="Enter school and board name"
                    {...register("tenthBoard")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.tenthBoard ? "border-red-500" : ""}`}
                    aria-invalid={errors.tenthBoard ? "true" : "false"}
                  />
                  {errors.tenthBoard && <p className="text-red-500 text-sm mt-1">{errors.tenthBoard.message}</p>}
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">12th Standard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="twelfthScore" className="block text-white font-medium mb-2">
                      12th Standard Score (%) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="twelfthScore"
                      placeholder="Enter your percentage"
                      {...register("twelfthScore")}
                      className={`bg-gray-700/50 border-gray-600 text-white ${errors.twelfthScore ? "border-red-500" : ""}`}
                      aria-invalid={errors.twelfthScore ? "true" : "false"}
                    />
                    {errors.twelfthScore && <p className="text-red-500 text-sm mt-1">{errors.twelfthScore.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="twelfthYear" className="block text-white font-medium mb-2">
                      Year of Passing <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="twelfthYear"
                      placeholder="Enter year (e.g., 2022)"
                      {...register("twelfthYear")}
                      className={`bg-gray-700/50 border-gray-600 text-white ${errors.twelfthYear ? "border-red-500" : ""}`}
                      aria-invalid={errors.twelfthYear ? "true" : "false"}
                    />
                    {errors.twelfthYear && <p className="text-red-500 text-sm mt-1">{errors.twelfthYear.message}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="twelfthSubjects" className="block text-white font-medium mb-2">
                    Subjects <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="twelfthSubjects"
                    placeholder="Enter subjects (comma separated)"
                    {...register("twelfthSubjects")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.twelfthSubjects ? "border-red-500" : ""}`}
                    aria-invalid={errors.twelfthSubjects ? "true" : "false"}
                  />
                  {errors.twelfthSubjects && (
                    <p className="text-red-500 text-sm mt-1">{errors.twelfthSubjects.message}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label htmlFor="twelfthBoard" className="block text-white font-medium mb-2">
                    School / Board <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="twelfthBoard"
                    placeholder="Enter school and board name"
                    {...register("twelfthBoard")}
                    className={`bg-gray-700/50 border-gray-600 text-white ${errors.twelfthBoard ? "border-red-500" : ""}`}
                    aria-invalid={errors.twelfthBoard ? "true" : "false"}
                  />
                  {errors.twelfthBoard && <p className="text-red-500 text-sm mt-1">{errors.twelfthBoard.message}</p>}
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
                        <label htmlFor="graduationStream" className="block text-white font-medium mb-2">
                          Undergraduate Stream
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Optional field</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                        <Input
                          id="graduationStream"
                          placeholder="E.g., Engineering, Arts, Science"
                          {...register("graduationStream")}
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="graduationYear" className="block text-white font-medium mb-2">
                          Year of Passing
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Optional field</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                        <Input
                          id="graduationYear"
                          placeholder="Enter year (e.g., 2023)"
                          {...register("graduationYear")}
                          className={`bg-gray-700/50 border-gray-600 text-white ${errors.graduationYear ? "border-red-500" : ""}`}
                          aria-invalid={errors.graduationYear ? "true" : "false"}
                        />
                        {errors.graduationYear && (
                          <p className="text-red-500 text-sm mt-1">{errors.graduationYear.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="graduationSubjects" className="block text-white font-medium mb-2">
                        Subjects
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Optional field</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <Input
                        id="graduationSubjects"
                        placeholder="Enter major subjects"
                        {...register("graduationSubjects")}
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="graduationUniversity" className="block text-white font-medium mb-2">
                        University
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Optional field</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <Input
                        id="graduationUniversity"
                        placeholder="Enter university name"
                        {...register("graduationUniversity")}
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="postgrad" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="pgStream" className="block text-white font-medium mb-2">
                          Postgraduate Stream
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Optional field</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                        <Input
                          id="pgStream"
                          placeholder="E.g., MBA, M.Tech, MA"
                          {...register("pgStream")}
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="pgYear" className="block text-white font-medium mb-2">
                          Year of Passing
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Optional field</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                        <Input
                          id="pgYear"
                          placeholder="Enter year (e.g., 2024)"
                          {...register("pgYear")}
                          className={`bg-gray-700/50 border-gray-600 text-white ${errors.pgYear ? "border-red-500" : ""}`}
                          aria-invalid={errors.pgYear ? "true" : "false"}
                        />
                        {errors.pgYear && <p className="text-red-500 text-sm mt-1">{errors.pgYear.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pgSubjects" className="block text-white font-medium mb-2">
                        Subjects
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Optional field</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <Input
                        id="pgSubjects"
                        placeholder="Enter specialization subjects"
                        {...register("pgSubjects")}
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="pgUniversity" className="block text-white font-medium mb-2">
                        University
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Optional field</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <Input
                        id="pgUniversity"
                        placeholder="Enter university name"
                        {...register("pgUniversity")}
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Entrance Test Details</h3>
                  <Button
                    type="button"
                    onClick={() => appendEntranceTest({ name: "", conductedBy: "", year: "", marksRank: "" })}
                    variant="outline"
                    size="sm"
                    className="border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Test
                  </Button>
                </div>

                {entranceTestFields.length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    No entrance tests added. Click "Add Test" to add details.
                  </p>
                )}

                {entranceTestFields.map((field, index) => (
                  <div key={field.id} className="bg-gray-700/30 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-white font-medium">Entrance Test {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeEntranceTest(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Name of Entrance Test</label>
                        <Input
                          {...register(`entranceTests.${index}.name`)}
                          placeholder="Enter test name"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Conducted By</label>
                        <Input
                          {...register(`entranceTests.${index}.conductedBy`)}
                          placeholder="Enter conducting organization"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Conducted in (Year)</label>
                        <Input
                          {...register(`entranceTests.${index}.year`)}
                          placeholder="Enter year (e.g., 2023)"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Marks/Rank</label>
                        <Input
                          {...register(`entranceTests.${index}.marksRank`)}
                          placeholder="Enter marks or rank"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  type="button"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
                <Button onClick={nextStep} className="bg-brand-orange hover:bg-orange-600 text-white" type="button">
                  Next Step <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Program Selection & Documents</h2>

            {/* Display any form errors */}
            {Object.keys(formErrors).length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Please correct the errors below before proceeding.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Program Preferences</h3>
                <p className="text-gray-300 mb-4">
                  Select the program type and specific course you wish to apply for. You can select up to three
                  preferences.
                </p>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="programType" className="block text-white font-medium mb-2">
                      Program Type <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="programType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger
                            className={`bg-gray-700/50 border-gray-600 text-white ${errors.programType ? "border-red-500" : ""}`}
                            aria-invalid={errors.programType ? "true" : "false"}
                          >
                            <SelectValue placeholder="Select program type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="Skill Courses">Skill Courses</SelectItem>
                            <SelectItem value="Diploma">Diploma</SelectItem>
                            <SelectItem value="Undergraduate Degree">Undergraduate Degree</SelectItem>
                            <SelectItem value="Postgraduate Degree">Postgraduate Degree</SelectItem>
                            <SelectItem value="Doctoral Program">Doctoral Program</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.programType && <p className="text-red-500 text-sm mt-1">{errors.programType.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="firstPreference" className="block text-white font-medium mb-2">
                      First Preference <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="firstPreference"
                      placeholder="Enter your first course preference"
                      {...register("firstPreference")}
                      className={`bg-gray-700/50 border-gray-600 text-white ${errors.firstPreference ? "border-red-500" : ""}`}
                      aria-invalid={errors.firstPreference ? "true" : "false"}
                    />
                    {errors.firstPreference && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstPreference.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="secondPreference" className="block text-white font-medium mb-2">
                      Second Preference (Optional)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Optional field</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <Input
                      id="secondPreference"
                      placeholder="Enter your second course preference"
                      {...register("secondPreference")}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="thirdPreference" className="block text-white font-medium mb-2">
                      Third Preference (Optional)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Optional field</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <Input
                      id="thirdPreference"
                      placeholder="Enter your third course preference"
                      {...register("thirdPreference")}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Hostel Requirement</h3>
                <div>
                  <label className="block text-white font-medium mb-2">Do you require hostel accommodation?</label>
                  <Controller
                    name="hostelRequired"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" id="hostel-yes" className="text-brand-orange" />
                          <Label htmlFor="hostel-yes" className="text-white">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id="hostel-no" className="text-brand-orange" />
                          <Label htmlFor="hostel-no" className="text-white">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
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
                      Identification Document (Passport/ID Card) <span className="text-red-500">*</span>
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
                        <input
                          type="file"
                          name="documents.idCard"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            // Validate file size
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0]
                              if (file.size > 2 * 1024 * 1024) {
                                alert("File size exceeds 2MB limit. Please choose a smaller file.")
                                e.target.value = ""
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      10th Standard Certificate & Marksheet <span className="text-red-500">*</span>
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
                        <input
                          type="file"
                          name="documents.tenthCertificate"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            // Validate file size
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0]
                              if (file.size > 2 * 1024 * 1024) {
                                alert("File size exceeds 2MB limit. Please choose a smaller file.")
                                e.target.value = ""
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      12th Standard Certificate & Marksheet <span className="text-red-500">*</span>
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
                        <input
                          type="file"
                          name="documents.twelfthCertificate"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            // Validate file size
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0]
                              if (file.size > 2 * 1024 * 1024) {
                                alert("File size exceeds 2MB limit. Please choose a smaller file.")
                                e.target.value = ""
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Graduation Certificate (if applicable)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 inline-block text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Optional field</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
                        <input
                          type="file"
                          name="documents.graduationCertificate"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            // Validate file size
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0]
                              if (file.size > 2 * 1024 * 1024) {
                                alert("File size exceeds 2MB limit. Please choose a smaller file.")
                                e.target.value = ""
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Passport Size Photograph <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700/30 border-gray-600 hover:bg-gray-700/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">JPG (MAX. 1MB)</p>
                        </div>
                        <input
                          type="file"
                          name="documents.photo"
                          className="hidden"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => {
                            // Validate file size
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0]
                              if (file.size > 1 * 1024 * 1024) {
                                alert("File size exceeds 1MB limit. Please choose a smaller file.")
                                e.target.value = ""
                              }
                            }
                          }}
                        />
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

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Declaration</h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Student Declaration</h4>
                  <div className="bg-gray-700/30 p-4 rounded-lg mb-4 text-gray-300 text-sm">
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        I hereby declare that all the information provided in this application is true and correct to
                        the best of my knowledge.
                      </li>
                      <li>
                        I understand that providing false information may result in the cancellation of my admission and
                        scholarship.
                      </li>
                      <li>
                        I agree to abide by the rules and regulations of the institution where I will be studying.
                      </li>
                      <li>I will maintain regular attendance and satisfactory academic performance.</li>
                      <li>
                        I will not engage in any activity that may bring disrepute to the scholarship program or the
                        institution.
                      </li>
                      <li>
                        I understand that the scholarship may be withdrawn if I fail to meet the academic requirements
                        or violate any rules.
                      </li>
                      <li>
                        I will inform the scholarship authorities of any changes in my personal or academic status.
                      </li>
                      <li>I will participate in all mandatory activities organized by the scholarship program.</li>
                      <li>I will represent my country with dignity and respect during my stay in India.</li>
                    </ol>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Controller
                      name="studentDeclaration"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="studentDeclaration"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className={`mt-1 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange ${errors.studentDeclaration ? "border-red-500" : ""}`}
                          aria-invalid={errors.studentDeclaration ? "true" : "false"}
                        />
                      )}
                    />
                    <label htmlFor="studentDeclaration" className="text-white">
                      I have read and agree with the above statements <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.studentDeclaration && (
                    <p className="text-red-500 text-sm mt-1">{errors.studentDeclaration.message}</p>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Parent/Guardian Declaration</h4>
                  <div className="bg-gray-700/30 p-4 rounded-lg mb-4 text-gray-300 text-sm">
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        I hereby declare that I am aware of my ward's application for the Indo-African Scholarship
                        program.
                      </li>
                      <li>I confirm that all the information provided in this application is true and correct.</li>
                      <li>I will support my ward in fulfilling all the requirements of the scholarship program.</li>
                    </ol>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Controller
                      name="parentDeclaration"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="parentDeclaration"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className={`mt-1 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange ${errors.parentDeclaration ? "border-red-500" : ""}`}
                          aria-invalid={errors.parentDeclaration ? "true" : "false"}
                        />
                      )}
                    />
                    <label htmlFor="parentDeclaration" className="text-white">
                      I have read and agree with the above statements <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.parentDeclaration && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentDeclaration.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  type="button"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-orange hover:bg-orange-600 text-white"
                >
                  {isSubmitting ? (
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
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center text-white">
            <p>Invalid step. Please refresh the page or contact support.</p>
          </div>
        )
    }
  }

  // Error dialog component
  const ErrorDialog = () => (
    <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
      <DialogContent className="bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-red-500">Error Submitting Application</DialogTitle>
          <DialogDescription className="text-gray-300">
            There was a problem submitting your application.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-white">{errorMessage}</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setShowErrorDialog(false)} className="bg-brand-orange hover:bg-orange-600 text-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Scholarship Application</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete the application form below to apply for the Indo-African Scholarship program.
          </p>
        </div>

        {!formSubmitted && (
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className={`flex flex-col items-center ${step >= 1 ? "text-brand-orange" : "text-gray-500"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 1 ? "bg-brand-orange text-black" : "bg-gray-700 text-gray-400"}`}
                >
                  1
                </div>
                <span className="text-sm">Personal Info</span>
              </div>

              <div className={`w-16 md:w-24 h-1 ${step >= 2 ? "bg-brand-orange" : "bg-gray-700"}`}></div>

              <div className={`flex flex-col items-center ${step >= 2 ? "text-brand-orange" : "text-gray-500"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 2 ? "bg-brand-orange text-black" : "bg-gray-700 text-gray-400"}`}
                >
                  2
                </div>
                <span className="text-sm">Family Info</span>
              </div>

              <div className={`w-16 md:w-24 h-1 ${step >= 3 ? "bg-brand-orange" : "bg-gray-700"}`}></div>

              <div className={`flex flex-col items-center ${step >= 3 ? "text-brand-orange" : "text-gray-500"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 3 ? "bg-brand-orange text-black" : "bg-gray-700 text-gray-400"}`}
                >
                  3
                </div>
                <span className="text-sm">Academic Info</span>
              </div>

              <div className={`w-16 md:w-24 h-1 ${step >= 4 ? "bg-brand-orange" : "bg-gray-700"}`}></div>

              <div className={`flex flex-col items-center ${step >= 4 ? "text-brand-orange" : "text-gray-500"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 4 ? "bg-brand-orange text-black" : "bg-gray-700 text-gray-400"}`}
                >
                  4
                </div>
                <span className="text-sm">Program & Documents</span>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <form ref={formRef} onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">{renderForm()}</div>
          </form>
        </div>
      </div>

      {/* Error Dialog */}
      <ErrorDialog />
    </div>
  )
}

