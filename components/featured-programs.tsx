import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Briefcase, Code, LineChart, Microscope } from "lucide-react"

const FeaturedPrograms = () => {
  const programs = [
    {
      title: "Undergraduate Degrees",
      icon: GraduationCap,
      description:
        "Bachelor's degrees in various disciplines including Engineering, Computer Science, Business, Arts, and more.",
      color: "from-blue-500 to-indigo-600",
      link: "/scholarships#undergraduate",
    },
    {
      title: "Postgraduate Programs",
      icon: BookOpen,
      description:
        "Master's programs designed to provide advanced knowledge and specialized skills in your chosen field.",
      color: "from-orange-500 to-red-600",
      link: "/scholarships#postgraduate",
    },
    {
      title: "Doctoral Studies",
      icon: Microscope,
      description: "PhD programs focused on research and academic excellence across multiple disciplines.",
      color: "from-purple-500 to-pink-600",
      link: "/scholarships#doctoral",
    },
    {
      title: "Skill Development",
      icon: Code,
      description: "Technical and vocational training designed to enhance employability and practical skills.",
      color: "from-green-500 to-teal-600",
      link: "/scholarships#skill-development",
    },
    {
      title: "Diploma Courses",
      icon: Briefcase,
      description: "Short-term diploma courses in various professional and technical fields.",
      color: "from-yellow-500 to-amber-600",
      link: "/scholarships#diploma",
    },
    {
      title: "Certificate Programs",
      icon: LineChart,
      description: "Specialized certificate programs to enhance your skills and qualifications.",
      color: "from-cyan-500 to-blue-600",
      link: "/scholarships#certificate",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Featured Programs</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our diverse range of academic and skill development programs available through the scholarship
            initiative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-brand-orange/10"
            >
              <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-gray-700/50 flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-colors">
                  <program.icon className="h-7 w-7 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{program.title}</h3>
                <p className="text-gray-300 mb-6 min-h-[80px]">{program.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-colors"
                >
                  <Link href={program.link}>Learn More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-brand-orange hover:bg-orange-600 text-white">
            <Link href="/scholarships">View All Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPrograms

