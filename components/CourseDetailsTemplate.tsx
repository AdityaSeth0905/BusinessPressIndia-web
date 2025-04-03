"use client"
import { useRouter } from "next/navigation";

type CourseDetailsTemplateProps = {
  title: string;
  description: string;
  courses: { [field: string]: string[] };
};

export default function CourseDetailsTemplate({ title, description, courses }: CourseDetailsTemplateProps) {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="text-brand-orange hover:underline mb-6 inline-block"
        >
          &larr; Back
        </button>
        <h1 className="text-4xl font-bold text-white mb-6">{title}</h1>
        <p className="text-gray-300 mb-8">{description}</p>

        <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Available Courses</h2>
          <ul className="space-y-6">
            {Object.entries(courses).map(([field, courseList]) => (
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