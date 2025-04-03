"use client";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import Link from "next/link";
const scholarshipPrograms = [
  {
    id: "certificate",
    title: "Certificate Programs",
    icon: Calendar,
    description: "Specialized certificate programs for skill enhancement",
    fields: [
      "Project Management",
      "Financial Analysis",
      "Supply Chain Management",
      "Artificial Intelligence",
      "Sustainable Development",
      "Public Health",
    ],
    courses: {
      "Certificate Programs": [
        "Certificate in Project Management",
        "Certificate in Financial Analysis",
        "Certificate in Supply Chain Management",
        "Certificate in Artificial Intelligence",
        "Certificate in Sustainable Development",
        "Certificate in Public Health",
      ],
    },
  }
];

export default function CertificatePrograms() {
  const program = scholarshipPrograms.find((p) => p.id === "certificate");

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