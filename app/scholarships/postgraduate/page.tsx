"use client";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const scholarshipPrograms = [
  {
    id: "postgraduate",
    title: "Postgraduate Programs",
    icon: BookOpen,
    description: "Master's degree programs for advanced specialization.",
    courses: {
      "Medical and Allied Sciences": [
        "Master of Science in Radiology and Imaging Technology",
        "Master of Science in Medical Radiology and Imaging Technology",
        "Master of Science in Operation Theatre and Anaesthesia Technology",
        "Master of Science in Renal Sciences and Dialysis Therapy",
        "Master of Physiotherapy",
        "Master of Physiotherapy in Sports",
        "Master of Physiotherapy in Orthopaedics",
        "Master of Physiotherapy in Neurology",
        "Master of Physiotherapy in Cardiorespiratory",
        "Master of Physiotherapy in Pediatrics",
        "Master of Science in Clinical Embryology and Reproductive Genetics",
        "Master of Science in Medical Laboratory Technology",
        "Master of Science in Medical Imaging Technology",
        "Master of Science in Optometry",
      ],
      "Agriculture and Allied Sciences": [
        "Master of Science in Agriculture (Horticulture)",
        "Master of Science in Agriculture (Agronomy)",
        "Master of Science in Agriculture (Plant Pathology)",
      ],
      "Science": [
        "Master of Science in Chemistry",
        "Master of Science degree in Pharmaceutical Chemistry",
        "Master of Science in Physics",
        "Master of Science in Mathematics",
        "Master of Science in Renewable Energy",
        "Master of Science in Astronomy and Astrophysics",
        "Master of Science in Biostatistics",
        "Master of Science in Clinical Microbiology",
        "Artificial Intelligence and Mathematics",
        "Data Science and Computing",
      ],
      "Commerce": ["Master of Commerce"],
      "Management": [
        "MBA : Master of Business Administration (Dual Specialisation)",
        "MBA in Sales and Distribution Management",
        "Executive Master of Business Administration",
        "Master of Business Administration in Event Management",
        "Master of Business Administration in Financial and Management Analytics",
        "Master of Business Administration in Retail Management",
        "Masters of Business Administration in collaboration with Sunstone",
        "Master of Business Administration with a Specialisation in Business Analytics in collaboration with Upgrad",
        "Masters of Business Administration with a Specialisation in Business & Data Analytics in collaboration with IBM",
        "Master of Business Administration with a Specialisation in Data Science in collaboration with IBM",
      ],
      "Computer Applications": [
        "Master of Computer Applications",
        "Master of Computer Applications in Artificial Intelligence and Machine Learning",
        "Master of Science in Information Technology (IT)",
      ],
      "Engineering": [
        "Master in Technology in Computer Science Engineering",
        "Master in Technology - CSE with Specialization in Artificial Intelligence",
        "Master in Technology in Computer Science Engineering with a Specialisation in Data Science",
        "Master in Technology in Computer Science Engineering with a Specialisation in Cyber Security",
        "Master of Technology in Mechanical Engineering",
        "Master of Technology in Production Engineering",
        "Master in Technology in Electronics And Communication Engineering",
        "Master in Technology in Electrical Engineering",
        "Master in Technology in Biomedical Engineering",
      ],
      "Fashion and Design": [
        "Master of Science in Fashion Management",
        "Master of Business Administration in Fashion Business Management",
      ],
      "Arts and Humanities": [
        "Master of Arts in Economics",
        "Master of Arts in Psychology",
        "Master of Arts in Clinical Psychology",
        "Master of Arts in Sociology",
        "Master of Arts in Political Science",
        "Master of Arts in English",
        "Master of Arts in Punjabi",
        "Master of Arts in Hindi",
        "Master of Arts in History",
        "Master of Arts in Police Administration",
        "Master of Arts in Public Administration",
      ],
      "Social Work": ["Master of Social Work"],
      "Journalism and Mass Communication": [
        "Master of Mass Communication and Journalism",
      ],
      "Library and Information Science": [
        "Master of Library and Information Science",
      ],
      "Education": ["Master of Education"],
    },
  },
];

export default function PostgraduatePrograms() {
  const program = scholarshipPrograms.find((p) => p.id === "postgraduate");

  if (!program) {
    return notFound();
  }

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Back to Scholarships Page Button */}
        <Link
          href="/scholarships"
          className="text-brand-orange hover:underline mb-6 inline-block"
        >
          &larr; Back
        </Link>

        <h1 className="text-4xl font-bold text-white mb-6">{program.title}</h1>
        <p className="text-gray-300 mb-8">{program.description}</p>

        <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Available Courses</h2>
          <ul className="space-y-6">
            {Object.entries(program.courses).map(([field, courseList]) => (
              <li key={field}>
                <h3 className="text-brand-orange font-semibold mb-2">{field}</h3>
                <ul className="pl-4 space-y-1">
                  {courseList.map((course, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mr-2"></div>
                      {course}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}