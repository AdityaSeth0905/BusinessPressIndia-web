import { Schema, model, models, type Document, type Model } from "mongoose"

// Define the sibling interface
interface Sibling {
  relation: "Brother" | "Sister"
  name: string
  school?: string
  class?: string
}

// Define the entrance test interface
interface EntranceTest {
  name: string
  conductedBy: string
  year: string
  marksRank: string
}

// Define the document interface
export interface IApplication extends Document {
  applicationId: string
  firstName: string
  lastName: string
  fatherName: string
  motherName: string
  dob: string
  sex: "Male" | "Female" | "Other"
  bloodGroup?: string
  passportNumber?: string
  govtIdNumber: string
  nationality: string
  state: string
  city: string
  district: string
  pincode: string
  residentialAddress: string
  secondaryAddress?: string
  studentMobile: string
  fatherMobile: string
  motherMobile?: string
  studentEmail: string
  parentEmail?: string
  fatherOccupation: string
  motherOccupation?: string
  fatherIncome: string
  fatherIncomeCurrency: string
  motherIncome?: string
  motherIncomeCurrency?: string
  siblings?: Sibling[]
  currentlyEnrolled: "Yes" | "No"
  currentInstitution?: string
  entranceTests?: EntranceTest[]
  tenthScore: string
  tenthSubjects: string
  tenthBoard: string
  tenthYear: string
  twelfthScore: string
  twelfthSubjects: string
  twelfthBoard: string
  twelfthYear: string
  graduationStream?: string
  graduationSubjects?: string
  graduationUniversity?: string
  graduationYear?: string
  pgStream?: string
  pgSubjects?: string
  pgUniversity?: string
  pgYear?: string
  ieltsScore?: string
  ieltsYear?: string
  programType: "Skill Courses" | "Diploma" | "Undergraduate Degree" | "Postgraduate Degree" | "Doctoral Program"
  firstPreference: string
  secondPreference?: string
  thirdPreference?: string
  hostelRequired: "Yes" | "No"
  studentDeclaration: boolean
  parentDeclaration: boolean
  documents?: Record<string, string>
  status: "Pending" | "Under Review" | "Approved" | "Rejected"
  submittedAt: Date
}

// Define the schema
const ApplicationSchema = new Schema<IApplication>(
  {
    applicationId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dob: { type: String, required: true },
    sex: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bloodGroup: { type: String },
    passportNumber: { type: String },
    govtIdNumber: { type: String, required: true },
    nationality: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    secondaryAddress: { type: String },
    studentMobile: { type: String, required: true },
    fatherMobile: { type: String, required: true },
    motherMobile: { type: String },
    studentEmail: { type: String, required: true },
    parentEmail: { type: String },
    fatherOccupation: { type: String, required: true },
    motherOccupation: { type: String },
    fatherIncome: { type: String, required: true },
    fatherIncomeCurrency: { type: String, default: "INR" },
    motherIncome: { type: String },
    motherIncomeCurrency: { type: String, default: "INR" },
    siblings: [
      {
        relation: { type: String, enum: ["Brother", "Sister"], required: true },
        name: { type: String, required: true },
        school: { type: String },
        class: { type: String },
      },
    ],
    currentlyEnrolled: { type: String, enum: ["Yes", "No"], required: true },
    currentInstitution: { type: String },
    entranceTests: [
      {
        name: { type: String, required: true },
        conductedBy: { type: String, required: true },
        year: { type: String, required: true },
        marksRank: { type: String, required: true },
      },
    ],
    tenthScore: { type: String, required: true },
    tenthSubjects: { type: String, required: true },
    tenthBoard: { type: String, required: true },
    tenthYear: { type: String, required: true },
    twelfthScore: { type: String, required: true },
    twelfthSubjects: { type: String, required: true },
    twelfthBoard: { type: String, required: true },
    twelfthYear: { type: String, required: true },
    graduationStream: { type: String },
    graduationSubjects: { type: String },
    graduationUniversity: { type: String },
    graduationYear: { type: String },
    pgStream: { type: String },
    pgSubjects: { type: String },
    pgUniversity: { type: String },
    pgYear: { type: String },
    ieltsScore: { type: String },
    ieltsYear: { type: String },
    programType: {
      type: String,
      enum: ["Skill Courses", "Diploma", "Undergraduate Degree", "Postgraduate Degree", "Doctoral Program"],
      required: true,
    },
    firstPreference: { type: String, required: true },
    secondPreference: { type: String },
    thirdPreference: { type: String },
    hostelRequired: { type: String, enum: ["Yes", "No"], default: "Yes" },
    studentDeclaration: { type: Boolean, required: true },
    parentDeclaration: { type: Boolean, required: true },
    documents: { type: Map, of: String },
    status: {
      type: String,
      enum: ["Pending", "Under Review", "Approved", "Rejected"],
      default: "Pending",
    },
    submittedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

// Create or retrieve the model
export const Application: Model<IApplication> =
  models.Application || model<IApplication>("Application", ApplicationSchema)

