"use client"

import { useState, useRef } from "react"
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
import { ChevronRight, ChevronLeft, CheckCircle, Upload, Plus, Trash2 } from "lucide-react"
import { useForm, useFieldArray, Controller, useWatch, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
//import { applicationSchema } from "../actions/submit-application"
import { submitApplication } from "../actions/submit-application"
import { applicationSchema } from "@/app/lib/schemas/application-schema";
import { extendedApplicationSchema } from "@/app/lib/schemas/application-schema";

// Define the type for our form data based on the Zod schema
type ApplicationFormData = z.infer<typeof applicationSchema>

//applicationSchema({
//  studentDeclaration: z.boolean().refine((val) => val === true, {
//    message: "You must agree to the student declaration",
//  }),
//  parentDeclaration: z.boolean().refine((val) => val === true, {
//    message: "You must agree to the parent declaration",
//  }),
//})

export default function ApplyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const programType = searchParams.get("program") || ""

  const [step, setStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Initialize the form with react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      programType: "Undergraduate Degree",
      hostelRequired: "Yes",
      siblings: [],
      entranceTests: [],
    },
  })

  const watch = useWatch({ control });
  const currentlyEnrolled = useWatch({
    control,
    name: "currentlyEnrolled",
    defaultValue: "No", // Default value if not set
  });

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

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
    setIsSubmitting(true)

    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData(formRef.current!)

      // Submit the form data to the server action
      const result = await submitApplication(formData)

      if (result.success) {
        setApplicationId(result.applicationId || "")
        setFormSubmitted(true)
        window.scrollTo(0, 0)
      } else {
        alert(result.message || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred while submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = async () => {
    let isValid = true;

    // Validate the current step
    await handleSubmit(
      () => { }, // Valid case
      () => {
        isValid = false; // Invalid case
      }
    )();

    if (!isValid) {
      console.log("Validation errors:", errors); // Log errors for debugging
      return; // Prevent moving to the next step if validation fails
    }

    // Move to the next step
    console.log("Proceeding to the next step...");
    setStep((prevStep) => prevStep + 1);
    window.scrollTo(0, 0); // Scroll to the top of the page
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
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
                  </label>
                  <Input
                    id="bloodGroup"
                    placeholder="e.g., A+, B-, O+"
                    {...register("bloodGroup")}
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="passportNumber" className="block text-white font-medium mb-2">
                    Passport Number
                  </label>
                  <Input
                    id="passportNumber"
                    placeholder="Enter passport number (if available)"
                    {...register("passportNumber")}
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="govtIdNumber" className="block text-white font-medium mb-2">
                    Government ID Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="govtIdNumber"
                    placeholder="Enter government ID number"
                    {...register("govtIdNumber")}
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
                {errors.residentialAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.residentialAddress.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="secondaryAddress" className="block text-white font-medium mb-2">
                  Secondary Address
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                  {errors.fatherMobile && <p className="text-red-500 text-sm mt-1">{errors.fatherMobile.message}</p>}
                </div>

                <div>
                  <label htmlFor="motherMobile" className="block text-white font-medium mb-2">
                    Mobile Number of Mother/Guardian
                  </label>
                  <Input
                    id="motherMobile"
                    placeholder="Enter mother's mobile number"
                    {...register("motherMobile")}
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
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
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                  {errors.studentEmail && <p className="text-red-500 text-sm mt-1">{errors.studentEmail.message}</p>}
                </div>

                <div>
                  <label htmlFor="parentEmail" className="block text-white font-medium mb-2">
                    Parent's Email (or Guardian)
                  </label>
                  <Input
                    id="parentEmail"
                    type="email"
                    placeholder="Enter parent's email address"
                    {...register("parentEmail")}
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                  {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail.message}</p>}
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
            <h2 className="text-2xl font-bold text-white mb-6">Family & Financial Information</h2>
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
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                  {errors.fatherOccupation && (
                    <p className="text-red-500 text-sm mt-1">{errors.fatherOccupation.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="motherOccupation" className="block text-white font-medium mb-2">
                    Mother's Occupation
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
                      className="bg-gray-700/50 border-gray-600 text-white flex-1"
                    />
                    <Controller
                      name="fatherIncomeCurrency"
                      control={control}
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
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="motherIncome"
                      placeholder="Enter annual income"
                      {...register("motherIncome")}
                      className="bg-gray-700/50 border-gray-600 text-white flex-1"
                    />
                    <Controller
                      name="motherIncomeCurrency"
                      control={control}
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
            <h2 className="text-2xl font-bold text-white mb-6">Academic Information</h2>
            <div className="space-y-6">
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Current Enrollment</h3>
                <div className="mb-4">
                  <label className="block text-white font-medium mb-2">Are you currently enrolled?</label>
                  <Controller
                    name="currentlyEnrolled"
                    control={control}
                    defaultValue="No" // Provide a default value
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" id="enrolled-yes" />
                          <Label htmlFor="enrolled-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id="enrolled-no" />
                          <Label htmlFor="enrolled-no">No</Label>
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
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                    {errors.tenthScore && <p className="text-red-500 text-sm mt-1">{errors.tenthScore.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="tenthYear" className="block text-white font-medium mb-2">
                      Year of Passing <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="tenthYear"
                      placeholder="Enter year"
                      {...register("tenthYear")}
                      className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                    {errors.twelfthScore && <p className="text-red-500 text-sm mt-1">{errors.twelfthScore.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="twelfthYear" className="block text-white font-medium mb-2">
                      Year of Passing <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="twelfthYear"
                      placeholder="Enter year"
                      {...register("twelfthYear")}
                      className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                    className="bg-gray-700/50 border-gray-600 text-white"
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
                        </label>
                        <Input
                          id="graduationYear"
                          placeholder="Enter year"
                          {...register("graduationYear")}
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="graduationSubjects" className="block text-white font-medium mb-2">
                        Subjects
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
                        </label>
                        <Input
                          id="pgYear"
                          placeholder="Enter year"
                          {...register("pgYear")}
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pgSubjects" className="block text-white font-medium mb-2">
                        Subjects
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
                          placeholder="Enter year"
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

      case 4:
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
                    <label htmlFor="programType" className="block text-white font-medium mb-2">
                      Program Type <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="programType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
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
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                    {errors.firstPreference && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstPreference.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="secondPreference" className="block text-white font-medium mb-2">
                      Second Preference (Optional)
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
                        <input type="file" name="documents.idCard" className="hidden" />
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
                        <input type="file" name="documents.tenthCertificate" className="hidden" />
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
                        <input type="file" name="documents.twelfthCertificate" className="hidden" />
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
                        <input type="file" name="documents.graduationCertificate" className="hidden" />
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
                        <input type="file" name="documents.photo" className="hidden" />
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
                          className="mt-1 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
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
                          className="mt-1 data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
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
                <Button onClick={prevStep} variant="outline" className="border-white text-white hover:bg-white/10">
                  <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-orange hover:bg-orange-600 text-white"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

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
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">{renderForm()}</div>
          </form>
        </div>
      </div>
    </div>
  )
}

