import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms & Conditions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before applying for the Indo-African Scholarship program.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">1. General Terms</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                1.1 The Indo-African Scholarship program is a joint initiative by AASGON (Africa Asia Scholars Global
                Network) and Business Press India.
              </p>
              <p>
                1.2 By applying for the scholarship, applicants acknowledge that they have read, understood, and agree
                to be bound by these terms and conditions.
              </p>
              <p>
                1.3 The scholarship providers reserve the right to modify these terms and conditions at any time without
                prior notice. Any changes will be effective immediately upon posting on the website.
              </p>
              <p>
                1.4 The decision of the scholarship selection committee is final and binding in all matters related to
                the scholarship program.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">2. Eligibility Criteria</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                2.1 The scholarship is primarily available to students from the Global South with preference to African
                Union Nations.
              </p>
              <p>
                2.2 Priority is given to candidates from underprivileged backgrounds, war-affected regions,
                single-parent households, women candidates, and tribal communities.
              </p>
              <p>
                2.3 Applicants must meet the minimum academic requirements specified for their chosen program of study.
              </p>
              <p>
                2.4 Applicants must have proficiency in English or be willing to undertake language training if
                required.
              </p>
              <p>2.5 Applicants must comply with all visa and immigration requirements of India.</p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">3. Application Process</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                3.1 All applications must be submitted through the official application portal or designated channels.
              </p>
              <p>
                3.2 Applicants must provide accurate and truthful information in their applications. Any false or
                misleading information may result in disqualification.
              </p>
              <p>
                3.3 All required documents must be submitted in the specified format and within the application
                deadline.
              </p>
              <p>3.4 Incomplete applications may not be considered for the scholarship.</p>
              <p>
                3.5 The scholarship providers are not responsible for any technical issues that may prevent the
                submission of applications.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">4. Scholarship Benefits and Conditions</h2>
            <div className="space-y-4 text-gray-300">
              <p>4.1 The scholarship covers 100% of the tuition fees for the selected program of study.</p>
              <p>
                4.2 The scholarship does not cover expenses related to accommodation, travel, books, health insurance,
                or personal expenses.
              </p>
              <p>
                4.3 The scholarship is awarded for the standard duration of the chosen program, subject to satisfactory
                academic performance.
              </p>
              <p>
                4.4 Scholarship recipients must maintain the minimum academic performance standards set by their
                institution to continue receiving the scholarship.
              </p>
              <p>
                4.5 Scholarship recipients must adhere to the code of conduct and regulations of their host institution.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">5. Termination of Scholarship</h2>
            <div className="space-y-4 text-gray-300">
              <p>5.1 The scholarship may be terminated if the recipient:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fails to maintain the required academic standards</li>
                <li>Violates the code of conduct of the host institution</li>
                <li>Provides false or misleading information in their application</li>
                <li>Withdraws from the program of study</li>
                <li>Violates any laws or regulations of India</li>
              </ul>
              <p>
                5.2 In case of termination, the recipient may be required to repay all or part of the scholarship
                amount, as determined by the scholarship providers.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">6. Privacy and Data Protection</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                6.1 The scholarship providers collect and process personal data in accordance with applicable data
                protection laws.
              </p>
              <p>
                6.2 Personal data collected during the application process will be used solely for the purpose of
                administering the scholarship program and related activities.
              </p>
              <p>
                6.3 By applying for the scholarship, applicants consent to the collection, processing, and sharing of
                their personal data as necessary for the scholarship program.
              </p>
              <p>
                6.4 The scholarship providers may use the names, photographs, and testimonials of scholarship recipients
                for promotional purposes.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">7. Contact Information</h2>
            <div className="space-y-4 text-gray-300">
              <p>7.1 For any questions or concerns regarding these terms and conditions, please contact:</p>
              <p>
                Dr. Sanjeev Seth
                <br />
                Director Education Development
                <br />
                7th Floor, Commercial Tower, Le-Meridian Hotel,
                <br />
                Raisina Road, New Delhi- 110001, India
                <br />
                Email: indoafricascholarships@gmail.com
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6">
              By applying for the Indo-African Scholarship program, you acknowledge that you have read, understood, and
              agree to these terms and conditions.
            </p>
            <Button asChild className="bg-brand-orange hover:bg-orange-600 text-white">
              <Link href="/apply">Apply for Scholarship</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

