import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">1. Introduction</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                1.1 The Indo-African Scholarship program ("we," "our," or "us") is committed to protecting your privacy
                and personal information.
              </p>
              <p>
                1.2 This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                interact with our website, application portal, or other services related to the scholarship program.
              </p>
              <p>
                1.3 By accessing or using our services, you consent to the practices described in this Privacy Policy.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">2. Information We Collect</h2>
            <div className="space-y-4 text-gray-300">
              <p>2.1 Personal Information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact information (name, email address, phone number, postal address)</li>
                <li>Demographic information (date of birth, gender, nationality)</li>
                <li>Educational background (academic records, institutions attended)</li>
                <li>Financial information (for scholarship eligibility assessment)</li>
                <li>Identification documents (passport, ID cards)</li>
                <li>Photographs and videos</li>
              </ul>

              <p>2.2 Technical Information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser information</li>
                <li>Device information</li>
                <li>Cookies and similar technologies</li>
                <li>Usage data (pages visited, time spent on the website)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">3. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-300">
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing scholarship applications</li>
                <li>Evaluating eligibility for scholarships</li>
                <li>Communicating with applicants and recipients</li>
                <li>Administering the scholarship program</li>
                <li>Improving our services and website</li>
                <li>Conducting research and analysis</li>
                <li>Complying with legal obligations</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">4. Information Sharing and Disclosure</h2>
            <div className="space-y-4 text-gray-300">
              <p>4.1 We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Partner educational institutions</li>
                <li>Government agencies (for visa and immigration purposes)</li>
                <li>Service providers who assist in operating our program</li>
                <li>Scholarship selection committee members</li>
              </ul>

              <p>
                4.2 We will not sell, rent, or lease your personal information to third parties for marketing purposes.
              </p>

              <p>
                4.3 We may disclose your information if required by law or to protect our rights, property, or safety.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">5. Data Security</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                5.1 We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                5.2 While we strive to use commercially acceptable means to protect your personal information, we cannot
                guarantee its absolute security.
              </p>
              <p>
                5.3 You are responsible for maintaining the confidentiality of any account credentials and for
                restricting access to your devices.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">6. Data Retention</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                6.1 We retain your personal information for as long as necessary to fulfill the purposes outlined in
                this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p>
                6.2 For unsuccessful scholarship applicants, we typically retain application data for up to two years.
              </p>
              <p>
                6.3 For scholarship recipients, we retain data for the duration of the scholarship program and for a
                reasonable period thereafter for record-keeping purposes.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">7. Your Rights</h2>
            <div className="space-y-4 text-gray-300">
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction of processing of your personal information</li>
                <li>Data portability</li>
                <li>Objection to processing of your personal information</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p>To exercise these rights, please contact us using the information provided in Section 10.</p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">8. Cookies and Similar Technologies</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                8.1 We use cookies and similar technologies to enhance your experience on our website, analyze usage
                patterns, and improve our services.
              </p>
              <p>
                8.2 You can control cookies through your browser settings. However, disabling cookies may limit your
                ability to use certain features of our website.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">9. Changes to This Privacy Policy</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                9.1 We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons.
              </p>
              <p>
                9.2 We will notify you of any material changes by posting the updated Privacy Policy on our website or
                through other communication channels.
              </p>
              <p>
                9.3 Your continued use of our services after any changes to this Privacy Policy constitutes your
                acceptance of the updated terms.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">10. Contact Us</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                please contact us at:
              </p>
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
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
            <Button asChild className="bg-brand-orange hover:bg-orange-600 text-white">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

