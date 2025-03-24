import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"

export default function FAQsPage() {
  const faqCategories = [
    {
      category: "General Information",
      questions: [
        {
          question: "What is the Indo-African Scholarship program?",
          answer:
            "The Indo-African Scholarship program is a joint CSR initiative by AASGON (Africa Asia Scholars Global Network) and Business Press India, offering 10,000+ tuition-free scholarships to students from the Global South, with preference to African Union Nations. The program aims to provide quality education opportunities to deserving students from underprivileged backgrounds.",
        },
        {
          question: "Who is eligible for the scholarship?",
          answer:
            "The scholarships are primarily designed for students from the Global South with preference to African Union Nations. Priority is given to candidates from underprivileged backgrounds, war-affected regions, single-parent households, women candidates, and tribal communities.",
        },
        {
          question: "What does the scholarship cover?",
          answer:
            "The scholarship covers 100% of the tuition fees for the selected programs. However, students may need to cover other expenses such as accommodation, travel, books, and personal expenses.",
        },
        {
          question: "How many scholarships are available?",
          answer:
            "The initiative offers 10,000+ scholarships across various academic programs and skill development courses.",
        },
      ],
    },
    {
      category: "Application Process",
      questions: [
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
          question: "How are candidates selected for the scholarship?",
          answer:
            "Selection is based on a combination of academic merit, entrance examination performance, interviews (where applicable), and consideration of socio-economic factors. The process aims to identify deserving candidates who would benefit most from the opportunity.",
        },
        {
          question: "Can I apply for multiple programs?",
          answer:
            "Yes, you can indicate your preferences for multiple programs in your application, but you will typically be considered for one program at a time based on your qualifications and preferences.",
        },
      ],
    },
    {
      category: "Academic Programs",
      questions: [
        {
          question: "What types of programs are available under the scholarship?",
          answer:
            "The scholarship covers a wide range of programs including undergraduate degrees, postgraduate programs, doctoral studies, diploma courses, certificate programs, and skill development courses across various disciplines.",
        },
        {
          question: "What is the language of instruction for these programs?",
          answer:
            "Most programs are conducted in English. Some programs may offer additional language support for non-native English speakers.",
        },
        {
          question: "Are there any specific academic requirements for different programs?",
          answer:
            "Yes, each program has specific academic requirements based on the level and field of study. Generally, undergraduate programs require completion of 12th standard or equivalent, while postgraduate programs require a relevant bachelor's degree.",
        },
        {
          question: "Can I transfer credits from my previous studies?",
          answer:
            "Credit transfer policies vary by institution and program. You should inquire about specific credit transfer possibilities during the application process.",
        },
      ],
    },
    {
      category: "Visa and Travel",
      questions: [
        {
          question: "Will the scholarship program assist with visa applications?",
          answer:
            "The program provides guidance and necessary documentation for visa applications, but students are responsible for following the visa application process for India.",
        },
        {
          question: "Is travel to India covered by the scholarship?",
          answer:
            "No, travel expenses to and from India are not covered by the scholarship. Students are responsible for arranging and financing their travel.",
        },
        {
          question: "What support is available for international students upon arrival in India?",
          answer:
            "Partner institutions typically provide orientation programs, accommodation assistance, and ongoing support services for international students.",
        },
      ],
    },
    {
      category: "Living in India",
      questions: [
        {
          question: "What accommodation options are available for scholarship recipients?",
          answer:
            "Most partner institutions offer on-campus or affiliated hostel accommodations for international students. Off-campus housing options are also available in surrounding areas.",
        },
        {
          question: "What is the estimated cost of living in India for students?",
          answer:
            "The cost of living varies by city, but international students typically need between $200-$400 USD per month for accommodation, food, local transportation, and personal expenses.",
        },
        {
          question: "Are there part-time work opportunities for international students?",
          answer:
            "International students in India are generally not permitted to work off-campus during their studies. Some institutions may offer on-campus work opportunities or internships as part of the curriculum.",
        },
      ],
    },
  ]

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about the Indo-African Scholarship program, application process, and
            student life in India.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-brand-orange pl-4">
                {category.category}
              </h2>

              <Accordion
                type="single"
                collapsible
                className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden mb-8"
              >
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`} className="border-gray-700">
                    <AccordionTrigger className="text-white px-6 hover:text-brand-orange hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 px-6 pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="bg-gradient-to-r from-brand-orange/20 to-brand-blue/20 p-8 rounded-xl border border-gray-700 mt-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
              <p className="text-lg text-gray-300 mb-6">
                If you couldn't find the answer to your question, please feel free to contact us directly.
              </p>
              <Button asChild className="bg-brand-orange hover:bg-orange-600 text-white">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

