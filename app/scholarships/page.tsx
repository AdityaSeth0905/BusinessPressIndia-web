import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Award, CheckCircle, Clock, Calendar, FileText, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ScholarshipsPage() {
  const scholarshipPrograms = [
    {
      id: "undergraduate",
      title: "Undergraduate Programs",
      icon: GraduationCap,
      description: "Bachelor's degree programs across various disciplines",
      fields: [
        "Engineering",
        "Computer Science",
        "Business Administration",
        "Medical Sciences",
        "Humanities",
        "Arts & Design",
      ],
    },
    {
      id: "postgraduate",
      title: "Postgraduate Programs",
      icon: BookOpen,
      description: "Master's degree programs for advanced specialization",
      fields: [
        "MBA",
        "Engineering",
        "Information Technology",
        "Healthcare Management",
        "International Relations",
        "Environmental Science",
      ],
    },
    {
      id: "doctoral",
      title: "Doctoral Programs",
      icon: Award,
      description: "PhD programs for research and academic excellence",
      fields: [
        "Computer Science",
        "Engineering",
        "Medical Research",
        "Economics",
        "Environmental Studies",
        "Social Sciences",
      ],
    },
    {
      id: "skill-development",
      title: "Skill Development",
      icon: CheckCircle,
      description: "Technical and vocational training programs",
      fields: [
        "Digital Marketing",
        "Web Development",
        "Data Analysis",
        "Graphic Design",
        "IoT & Embedded Systems",
        "Renewable Energy",
      ],
    },
    {
      id: "diploma",
      title: "Diploma Courses",
      icon: Clock,
      description: "Short-term diploma courses for professional development",
      fields: [
        "Business Management",
        "Healthcare",
        "Hospitality",
        "Digital Technologies",
        "Agriculture",
        "Construction Management",
      ],
    },
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
    },
  ]

  const faqs = [
    {
      question: "Who is eligible for the Indo-African Scholarships?",
      answer:
        "The scholarships are primarily designed for students from the Global South with preference to African Union Nations. Priority is given to candidates from underprivileged backgrounds, war-affected regions, single-parent households, women candidates, and tribal communities.",
    },
    {
      question: "Is the scholarship really 100% tuition-free?",
      answer:
        "Yes, the scholarship covers 100% of the tuition fees for the selected programs. However, students may need to cover other expenses such as accommodation, travel, books, and personal expenses.",
    },
    {
      question: "How are candidates selected for the scholarship?",
      answer:
        "Selection is based on a combination of academic merit, entrance examination performance, interviews (where applicable), and consideration of socio-economic factors. The process aims to identify deserving candidates who would benefit most from the opportunity.",
    },
    {
      question: "How many scholarships are available?",
      answer:
        "The initiative offers 10,000+ scholarships across various academic programs and skill development courses.",
    },
    {
      question: "When can I apply for the scholarship?",
      answer:
        "Applications are accepted twice a year, with selection rounds in January-April and May-December. Check the specific deadlines for your program of interest.",
    },
    {
      question: "What documents are required for the application?",
      answer:
        "Typically required documents include academic transcripts/certificates, identification proof, proof of nationality, language proficiency certificates (if applicable), and supporting documents related to socio-economic status or special circumstances.",
    },
    {
      question: "Can I apply for multiple programs?",
      answer:
        "Yes, you can indicate your preferences for multiple programs in your application, but you will typically be considered for one program at a time based on your qualifications and preferences.",
    },
    {
      question: "What is the language of instruction for these programs?",
      answer:
        "Most programs are conducted in English. Some programs may offer additional language support for non-native English speakers.",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Scholarships</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our range of 100% tuition-free scholarship opportunities available to students from the Global
            South, with preference to African Union Nations.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <p className="text-lg text-gray-300 mb-6">
              The 10000+ Indian African Scholarships are designed for the entire Global South with preference to African
              Union Nations. The eligibility criteria include:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-brand-orange mr-3 mt-0.5" />
                <span className="text-gray-300">
                  Educational backgrounds & marks scored in 10th & 12th standard / Entrance Examination / Interview
                  whichever deemed fit.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-brand-orange mr-3 mt-0.5" />
                <span className="text-gray-300">
                  Priority for candidates coming from under privileged, deprived, single parents child, women
                  candidates, war hit & socially/economically challenged individuals.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-brand-orange mr-3 mt-0.5" />
                <span className="text-gray-300">
                  The merit list for selected candidates is released twice a year (January-April / May-December) to
                  accommodate maximum applicants.
                </span>
              </li>
            </ul>

            <div className="flex justify-center">
              <Button asChild className="bg-brand-orange hover:bg-orange-600 text-white">
                <Link href="#application-process">Application Process</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Available Programs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarshipPrograms.map((program) => (
              <Card
                key={program.id}
                id={program.id}
                className="bg-gray-800/50 border-gray-700 hover:border-brand-orange transition-colors"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                    <program.icon className="h-6 w-6 text-brand-orange" />
                  </div>
                  <CardTitle className="text-white text-2xl">{program.title}</CardTitle>
                  <CardDescription className="text-gray-400">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="text-white font-medium mb-2">Available Fields:</h4>
                  <ul className="space-y-1">
                    {program.fields.map((field, index) => (
                      <li key={index} className="text-gray-300 flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mr-2"></div>
                        {field}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full text-white border-gray-600 hover:bg-brand-orange hover:text-black hover:border-brand-orange"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div id="application-process" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Application Process</h2>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Application Steps</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-black flex items-center justify-center font-bold mr-3">
                      1
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Check Your Eligibility</h4>
                      <p className="text-gray-300">
                        Verify if you meet the academic and demographic requirements for the scholarship program.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-black flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Complete the Application Form</h4>
                      <p className="text-gray-300">
                        Fill out the application form with your personal details, academic history, and program
                        preferences.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-black flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Submit Required Documents</h4>
                      <p className="text-gray-300">
                        Upload all necessary academic records, identification, and supporting materials.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-black flex items-center justify-center font-bold mr-3">
                      4
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Await Selection Results</h4>
                      <p className="text-gray-300">
                        Applications are evaluated based on merit, need, and alignment with scholarship priorities.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Required Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-brand-orange mr-2 mt-0.5" />
                    <span className="text-gray-300">Personal details (name, address, contact information)</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-brand-orange mr-2 mt-0.5" />
                    <span className="text-gray-300">
                      Academic records (10th & 12th standard scores, subjects, board, year of passing)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-brand-orange mr-2 mt-0.5" />
                    <span className="text-gray-300">Higher education details (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-brand-orange mr-2 mt-0.5" />
                    <span className="text-gray-300">English proficiency level</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-brand-orange mr-2 mt-0.5" />
                    <span className="text-gray-300">Program preferences</span>
                  </li>
                </ul>

                <div className="mt-8 p-4 bg-black/30 rounded-lg border border-gray-700">
                  <h4 className="text-white font-medium mb-2">Application Timeline</h4>
                  <p className="text-gray-300">The merit list for selected candidates is released twice a year:</p>
                  <ul className="mt-2 space-y-2">
                    <li className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mr-2"></div>
                      January - April Session
                    </li>
                    <li className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mr-2"></div>
                      May - December Session
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button asChild size="lg" className="bg-brand-orange hover:bg-orange-600 text-white">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>

          <Accordion
            type="single"
            collapsible
            className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
                <AccordionTrigger className="text-white px-6 hover:text-brand-orange hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-gradient-to-r from-brand-orange/20 to-brand-blue/20 p-8 rounded-xl border border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Begin Your Educational Journey?</h2>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Take the first step towards transforming your educational and career prospects with the Indo-African
              Scholarship program.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-orange hover:bg-orange-600 text-white">
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

