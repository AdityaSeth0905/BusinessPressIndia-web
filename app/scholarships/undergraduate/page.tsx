"use client";
import { notFound } from "next/navigation";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
const scholarshipPrograms = [
  {
    id: "undergraduate",
    title: "Undergraduate Programs",
    icon: GraduationCap,
    description: "Bachelor's degree programs across various disciplines",
    courses: {
      "Medical and Allied Sciences": [
        "Bachelor of Dental Surgery",
        "Nursing (Post-Basic)",
        "PARAMEDICS",
        "(Nursing)",
        "General Nursing and Midwifery",
        "Bachelor of Science in Medical Radiology and Imaging Technology",
        "Bachelor of Science in Medical Radiology and Imaging Technology (Lateral Entry)",
        "Bachelor of Science in Operation Theatre and Anaesthesia Technology",
        "Bachelor of Science in Operation Theatre and Anaesthesia Technology (Lateral Entry)",
        "Bachelor of Science in Forensic Science",
        "Bachelor of Science in Cardiovascular Technology",
        "Renal Sciences & Dialysis Therapy Technology",
        "Renal Sciences & Dialysis Therapy Technology (Lateral Entry)",
        "Bachelor of Physiotherapy",
        "BPT Bachelor of Physiotherapy (Lateral Entry)",
      ],
      "Agriculture and Allied Sciences": [
        "(Agriculture - Hons)",
        "B.Vocational (Organic Farming)",
        "B.Vocational in Floriculture and Landscaping",
      ],
      "Science": [
        "Bachelor of Science in Physical Sciences",
        "Bachelor of Science (Hons) in Physics",
        "Bachelor of Science (Hons) in Chemistry",
        "Bachelor of Science (Hons) in Mathematics",
        "Bachelor of Science (Hons) in Computer Science",
        "CMS (Computer,Statistics,Mathematics)",
        "Bachelor of Science in Astronomy and Astrophysics",
        "Artificial Intelligence and Mathematics",
        "Bachelor of Science in Data Science and Computing",
      ],
      "Commerce": ["Bachelor of Commerce (Honours)"],
      "Management": [
        "BBA : Bachelor of Business Administration (Dual Specialisation)",
        "Bachelor of Business Administration collaboration with Sunstone",
        "Bachelor of Business Administration with a Specialisation in Business Analytics in collaboration with Upgrad",
      ],
      "Computer Applications": [
        "Bachelor of Computer Applications",
        "Bachelor of Computer Applications in Data Science",
        "Bachelor of Computer Applications in Artificial Intelligence",
        "Bachelor of Computer Applications in Cyber Security",
        "Bachelor of Computer Applications in Full Stack Development",
      ],
      "Engineering": [
        "Bachelor in Technology in Computer Science Engineering",
        "Bachelor in Technology in Computer Science Engineering with a Specialisation in Artificial Intelligence & Machine Learning",
        "Bachelor in Technology in Computer Science Engineering with a Specialisation in Full Stack Development",
        "Bachelor in Technology in Computer Science Engineering with a Specialisation in Data Science",
        "Bachelor in Technology in Computer Science Engineering with a Specialisation in Cyber Security & Ethical Hacking",
        "Bachelor in Technology in Computer Science Engineering (Lateral Entry)",
        "Bachelor of Technology in Mechanical Engineering",
        "Bachelor of Technology in Aerospace Engineering",
        "Bachelor in Technology in Mechatronics Engineering",
        "Bachelor of Technology in Biomedical Engineering",
        "Bachelor in Technology in Electronics And Communication Engineering",
        "Bachelor in Technology in Electrical Engineering",
        "Bachelor of Technology in Internet of Things",
        "Bachelor in Technology in Electronics And Communication Engineering (Lateral Entry)",
        "Bachelor of Technology in Electronics and Computer Engineering",
      ],
      "Fashion and Design": [
        "Bachelor of Science in Fashion Designing",
        "Bachelor of Design in Interior Designing",
      ],
      "Arts and Humanities": [
        "Bachelor of Arts",
        "Bachelor of Arts (Hons) in Punjabi",
        "Bachelor of Arts (Hons) in Hindi",
        "Bachelor of Arts (Hons) in Sociology",
        "Bachelor of Arts (Hons) in Psychology",
        "Bachelor of Arts (Hons) in History",
        "Bachelor of Arts (Hons) in Physical Education",
        "Bachelor of Arts (Hons) in Economics",
        "Bachelor of Arts (Hons) in Computer Science",
        "Bachelor of Arts (Hons) in English",
        "Bachelor of Arts (Hons) in Political Science",
        "Bachelor of Arts (Hons) in Geography",
        "Bachelor of Arts (Hons) in Home Science",
        "Bachelor of Arts (Hons) in Public Administration",
        "Bachelor of Arts (Hons) in Music",
      ],
      "Social Work": ["Bachelor of Social Work"],
      "Journalism and Mass Communication": [
        "Bachelor of Journalism and Mass Communication",
      ],
      "Library and Information Science": [
        "Bachelor of Library and Information Science",
      ],
      "Education": [
        "Bachelor of Education",
        "Bachelor of Physical Education",
      ],
    },
  },
];

export default function Undergraduate() {
  const program = scholarshipPrograms.find((p) => p.id === "undergraduate");

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