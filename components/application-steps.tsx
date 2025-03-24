import { ClipboardCheck, FileText, UserCheck, CheckCircle, School, Lightbulb } from "lucide-react"

const ApplicationSteps = () => {
  const steps = [
    {
      icon: ClipboardCheck,
      title: "Check Eligibility",
      description: "Verify if you meet the academic and demographic requirements for the scholarship program.",
    },
    {
      icon: FileText,
      title: "Submit Application",
      description:
        "Complete the online application form with your personal details, academic history, and program preferences.",
    },
    {
      icon: UserCheck,
      title: "Document Verification",
      description: "Upload required documents including academic records, identification, and supporting materials.",
    },
    {
      icon: Lightbulb,
      title: "Selection Process",
      description: "Applications are evaluated based on merit, need, and alignment with scholarship priorities.",
    },
    {
      icon: CheckCircle,
      title: "Receive Notification",
      description:
        "Selected candidates are notified via email and must confirm acceptance within the specified timeframe.",
    },
    {
      icon: School,
      title: "Begin Your Journey",
      description: "Complete enrollment procedures and prepare for your academic journey in India.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How to Apply</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow these simple steps to apply for the Indo-African Scholarship program and begin your educational
            journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 relative hover:border-brand-orange transition-colors"
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-brand-orange text-black flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-brand-orange" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4 text-center">{step.title}</h3>
              <p className="text-gray-300 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ApplicationSteps

