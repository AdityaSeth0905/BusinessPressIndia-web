"use client";
import { notFound } from "next/navigation";
import { Award } from "lucide-react";
import Link from "next/link";

const scholarshipPrograms = [
  {
    id: "doctoral",
    title: "Doctoral Programs",
    icon: Award,
    description: "PhD programs for research and academic excellence.",
    courses: {
      "Medical and Allied Sciences": [
        "PhD in Medical Sciences",
        "PhD in Allied Health Sciences",
      ],
      "Agriculture and Allied Sciences": [
        "PhD in Agriculture",
        "PhD in Horticulture",
      ],
      "Science": [
        "PhD in Physics",
        "PhD in Chemistry",
      ],
      "Commerce": ["PhD in Commerce"],
      "Management": ["PhD in Management"],
      "Computer Applications": ["PhD in Computer Applications"],
      "Engineering": ["PhD in Engineering"],
      "Fashion and Design": ["PhD in Fashion Design"],
      "Arts and Humanities": [
        "PhD in Arts",
        "PhD in Humanities",
      ],
      "Social Work": ["PhD in Social Work"],
      "Journalism and Mass Communication": [
        "PhD in Journalism and Mass Communication",
      ],
      "Library and Information Science": [
        "PhD in Library and Information Science",
      ],
      "Education": ["PhD in Education"],
      "Interdisciplinary Programs": [
        "PhD in Interdisciplinary Studies",
      ],
      "Allied Health Sciences": [
        "PhD in Physiotherapy",
        "PhD in Occupational Therapy",
      ],
      "Nursing": ["PhD in Nursing"],
      "Pharmacy": ["PhD in Pharmaceutical Sciences"],
      "Engineering and Technology": [
        "PhD in Computer Science and Engineering",
        "PhD in Mechanical Engineering",
        "PhD in Electrical Engineering",
        "PhD in Civil Engineering",
      ],
      "Management and Commerce": [
        "PhD in Management",
        "PhD in Commerce",
      ],
      "Arts and Humanities (continued)": [
        "PhD in English",
        "PhD in History",
        "PhD in Philosophy",
      ],
      "Social Sciences": [
        "PhD in Sociology",
        "PhD in Psychology",
        "PhD in Economics",
      ],
      "Interdisciplinary Programs (continued)": [
        "PhD in Interdisciplinary Studies",
      ],
      "Specialized Programs": [
        "PhD in Data Science",
        "PhD in Artificial Intelligence",
        "PhD in Cyber Security",
        "PhD in Environmental Science",
        "PhD in Public Health",
      ],
      "Online and Distance Programs": [
        "PhD in Online Education",
        "PhD in Distance Education",
      ],
      "Liberal Arts": [
        "PhD in Liberal Arts",
      ],
    },
  },
];

export default function DoctoralPrograms() {
  const program = scholarshipPrograms.find((p) => p.id === "doctoral");

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