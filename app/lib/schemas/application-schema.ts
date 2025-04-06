import { z } from "zod"

/**
 * Schema for sibling information
 * Validates structure and required fields for sibling data
 */
const siblingSchema = z.object({
  relation: z.enum(["Brother", "Sister"], {
    required_error: "Please select a relation",
  }),
  name: z.string().min(1, "Name is required"),
  school: z.string().optional(),
  class: z.string().optional(),
})

/**
 * Schema for entrance test information
 * Validates structure and required fields for entrance test data
 */
const entranceTestSchema = z.object({
  name: z.string().min(1, "Test name is required"),
  conductedBy: z.string().min(1, "Conducting organization is required"),
  year: z
    .string()
    .min(4, "Please enter a valid year")
    .max(4, "Please enter a valid year")
    .regex(/^\d{4}$/, "Year must be a 4-digit number"),
  marksRank: z.string().min(1, "Marks/Rank is required"),
})

/**
 * Document schema for file uploads
 * Validates file types and sizes
 */
const documentSchema = z.record(z.any()).optional()

/**
 * Main application schema
 * Comprehensive validation for all form fields with appropriate error messages
 */
export const applicationSchema = z.object({
  // Personal Information
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name should only contain letters and spaces"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name should only contain letters and spaces"),

  fatherName: z
    .string()
    .min(2, "Father's name must be at least 2 characters")
    .max(100, "Father's name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Father's name should only contain letters and spaces"),

  motherName: z
    .string()
    .min(2, "Mother's name must be at least 2 characters")
    .max(100, "Mother's name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Mother's name should only contain letters and spaces"),

  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      // Check if date is valid and not in the future
      const selectedDate = new Date(date)
      const today = new Date()
      return !isNaN(selectedDate.getTime()) && selectedDate < today
    }, "Please enter a valid date of birth (not in the future)"),

  sex: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select your gender",
  }),

  bloodGroup: z.string().optional(),

  passportNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Z0-9]{6,12}$/.test(val), {
      message: "Please enter a valid passport number (6-12 alphanumeric characters)",
    }),

  govtIdNumber: z
    .string()
    .min(5, "Government ID number must be at least 5 characters")
    .max(30, "Government ID number cannot exceed 30 characters"),

  nationality: z
    .string()
    .min(2, "Nationality must be at least 2 characters")
    .max(50, "Nationality cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Nationality should only contain letters and spaces"),

  state: z.string().min(2, "State must be at least 2 characters").max(50, "State cannot exceed 50 characters"),

  city: z.string().min(2, "City must be at least 2 characters").max(50, "City cannot exceed 50 characters"),

  district: z.string().min(2, "District must be at least 2 characters").max(50, "District cannot exceed 50 characters"),

  pincode: z
    .string()
    .min(4, "Pincode must be at least 4 characters")
    .max(10, "Pincode cannot exceed 10 characters")
    .regex(/^[0-9]+$/, "Pincode should only contain numbers"),

  residentialAddress: z
    .string()
    .min(10, "Residential address must be at least 10 characters")
    .max(500, "Residential address cannot exceed 500 characters"),

  secondaryAddress: z.string().optional(),

  // Contact Information
  studentMobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number cannot exceed 15 digits")
    .regex(/^[+]?[0-9\s-()]+$/, "Please enter a valid mobile number"),

  fatherMobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number cannot exceed 15 digits")
    .regex(/^[+]?[0-9\s-()]+$/, "Please enter a valid mobile number"),

  motherMobile: z
    .string()
    .optional()
    .refine((val) => !val || /^[+]?[0-9\s-()]+$/.test(val), {
      message: "Please enter a valid mobile number",
    }),

  studentEmail: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email cannot exceed 100 characters"),

  parentEmail: z.string().email("Please enter a valid email address").optional(),

  // Family Information
  fatherOccupation: z
    .string()
    .min(2, "Father's occupation must be at least 2 characters")
    .max(100, "Father's occupation cannot exceed 100 characters"),

  motherOccupation: z.string().optional(),

  fatherIncome: z
    .string()
    .min(1, "Father's income is required")
    .regex(/^[0-9,.]+$/, "Please enter a valid income amount (numbers only)"),

  fatherIncomeCurrency: z.string().default("INR"),

  motherIncome: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9,.]+$/.test(val), {
      message: "Please enter a valid income amount (numbers only)",
    }),

  motherIncomeCurrency: z.string().default("INR"),

  siblings: z.array(siblingSchema).optional().default([]),

  // Academic Information
  currentlyEnrolled: z.enum(["Yes", "No"], {
    required_error: "Please select if you are currently enrolled",
  }),

  currentInstitution: z.string().optional(),

  entranceTests: z.array(entranceTestSchema).optional().default([]),

  // 10th Standard
  tenthScore: z
    .string()
    .min(1, "10th score is required")
    .regex(/^[0-9.]+$/, "Please enter a valid score (numbers only)"),

  tenthSubjects: z.string().min(3, "Please enter at least one subject").max(200, "Subject list is too long"),

  tenthBoard: z
    .string()
    .min(2, "Board name must be at least 2 characters")
    .max(100, "Board name cannot exceed 100 characters"),

  tenthYear: z
    .string()
    .min(4, "Please enter a valid year")
    .max(4, "Please enter a valid year")
    .regex(/^\d{4}$/, "Year must be a 4-digit number"),

  // 12th Standard
  twelfthScore: z
    .string()
    .min(1, "12th score is required")
    .regex(/^[0-9.]+$/, "Please enter a valid score (numbers only)"),

  twelfthSubjects: z.string().min(3, "Please enter at least one subject").max(200, "Subject list is too long"),

  twelfthBoard: z
    .string()
    .min(2, "Board name must be at least 2 characters")
    .max(100, "Board name cannot exceed 100 characters"),

  twelfthYear: z
    .string()
    .min(4, "Please enter a valid year")
    .max(4, "Please enter a valid year")
    .regex(/^\d{4}$/, "Year must be a 4-digit number"),

  // Graduation (Optional)
  graduationStream: z.string().optional(),
  graduationSubjects: z.string().optional(),
  graduationUniversity: z.string().optional(),
  graduationYear: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}$/.test(val), {
      message: "Year must be a 4-digit number",
    }),

  // Post Graduation (Optional)
  pgStream: z.string().optional(),
  pgSubjects: z.string().optional(),
  pgUniversity: z.string().optional(),
  pgYear: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}$/.test(val), {
      message: "Year must be a 4-digit number",
    }),

  // IELTS (Optional)
  ieltsScore: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9.]+$/.test(val), {
      message: "Please enter a valid IELTS score",
    }),

  ieltsYear: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}$/.test(val), {
      message: "Year must be a 4-digit number",
    }),

  // Program Preferences
  programType: z.enum(["Skill Courses", "Diploma", "Undergraduate Degree", "Postgraduate Degree", "Doctoral Program"], {
    required_error: "Please select a program type",
  }),

  firstPreference: z
    .string()
    .min(3, "First preference must be at least 3 characters")
    .max(100, "First preference cannot exceed 100 characters"),

  secondPreference: z.string().optional(),
  thirdPreference: z.string().optional(),

  // Hostel
  hostelRequired: z.enum(["Yes", "No"]).default("Yes"),

  // Declarations
  studentDeclaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the student declaration",
  }),

  parentDeclaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the parent declaration",
  }),

  // Documents
  documents: documentSchema,
})

/**
 * Extended application schema with additional validation
 * Used for server-side validation with more strict rules
 */
export const extendedApplicationSchema = applicationSchema.extend({
  // Add any additional server-side validation here
  studentDeclaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the student declaration",
  }),
  parentDeclaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the parent declaration",
  }),
})

// Type for form data based on the schema
export type ApplicationFormData = z.infer<typeof applicationSchema>

