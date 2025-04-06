import { z } from "zod"
//import { applicationSchema } from "@/app/lib/schemas/application-schema";
// Define the sibling schema
const siblingSchema = z.object({
  relation: z.enum(["Brother", "Sister"]).optional(),
  name: z.string().min(1, "Name is required").optional(),
  school: z.string().optional(),
  class: z.string().optional(),
})

// Define the entrance test schema
const entranceTestSchema = z.object({
  name: z.string().min(1, "Test name is required").optional(),
  conductedBy: z.string().min(1, "Conducted by is required").optional(),
  year: z.string().min(1, "Year is required").optional(),
  marksRank: z.string().min(1, "Marks/Rank is required").optional(),
})

// Define the main application schema
export const applicationSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  fatherName: z.string().min(1, "Father's name is required").optional(),
  motherName: z.string().min(1, "Mother's name is required").optional(),
  dob: z.string().min(1, "Date of birth is required").optional(),
  sex: z.enum(["Male", "Female", "Other"]).optional(),
  bloodGroup: z.string().optional(),
  passportNumber: z.string().optional(),
  govtIdNumber: z.string().min(1, "Government ID is required").optional(),
  nationality: z.string().min(1, "Nationality is required").optional(),
  state: z.string().min(1, "State is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  district: z.string().min(1, "District is required").optional(),
  pincode: z.string().min(1, "Pincode is required").optional(),
  residentialAddress: z.string().min(1, "Residential address is required").optional(),
  secondaryAddress: z.string().optional(),

  // Contact Information
  studentMobile: z.string().min(10, "Student mobile number is required").optional(),
  fatherMobile: z.string().min(10, "Father's mobile number is required").optional(),
  motherMobile: z.string().optional(),
  studentEmail: z.string().email("Invalid email address").optional(),
  parentEmail: z.string().email("Invalid email address").optional(),

  // Family Information
  fatherOccupation: z.string().min(1, "Father's occupation is required").optional(),
  motherOccupation: z.string().optional(),
  fatherIncome: z.string().min(1, "Father's income is required").optional(),
  fatherIncomeCurrency: z.string().default("INR").optional(),
  motherIncome: z.string().optional(),
  motherIncomeCurrency: z.string().default("INR"),
  siblings: z.array(siblingSchema).optional(),

  // Academic Information
  currentlyEnrolled: z.enum(["Yes", "No"]),
  currentInstitution: z.string().optional(),
  entranceTests: z.array(entranceTestSchema).optional(),

  // 10th Standard
  tenthScore: z.string().min(1, "10th score is required").optional(),
  tenthSubjects: z.string().min(1, "10th subjects are required").optional(),
  tenthBoard: z.string().min(1, "10th board is required").optional(),
  tenthYear: z.string().min(1, "10th year is required").optional(),

  // 12th Standard
  twelfthScore: z.string().min(1, "12th score is required").optional(),
  twelfthSubjects: z.string().min(1, "12th subjects are required").optional(),
  twelfthBoard: z.string().min(1, "12th board is required").optional(),
  twelfthYear: z.string().min(1, "12th year is required").optional(),

  // Graduation (Optional)
  graduationStream: z.string().optional(),
  graduationSubjects: z.string().optional(),
  graduationUniversity: z.string().optional(),
  graduationYear: z.string().optional(),

  // Post Graduation (Optional)
  pgStream: z.string().optional(),
  pgSubjects: z.string().optional(),
  pgUniversity: z.string().optional(),
  pgYear: z.string().optional(),

  // IELTS (Optional)
  ieltsScore: z.string().optional(),
  ieltsYear: z.string().optional(),

  // Program Preferences
  programType: z.enum(["Skill Courses", "Diploma", "Undergraduate Degree", "Postgraduate Degree", "Doctoral Program"]),
  firstPreference: z.string().min(1, "First preference is required").optional(),
  secondPreference: z.string().optional(),
  thirdPreference: z.string().optional(),

  // Hostel
  hostelRequired: z.enum(["Yes", "No"]).default("Yes").optional(),

  // Declarations
  studentDeclaration: z.boolean().refine(async (val) => val === true, {
    message: "You must agree to the student declaration",
  }),
  parentDeclaration: z.boolean().refine(async (val) => val === true, {
    message: "You must agree to the parent declaration",
  }),

  // Documents
  documents: z.record(z.string()).optional(),
})

export const extendedApplicationSchema = applicationSchema.extend({
  studentDeclaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the student declaration",
  }),
  parentDeclaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the parent declaration",
  }),
});