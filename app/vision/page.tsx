import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Award, GraduationCap, ArrowRight, Lightbulb, Handshake, Heart } from "lucide-react"

export default function VisionPage() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Vision</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A world where every deserving student has access to quality education regardless of their socio-economic
            background.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">One Planet One Future</h2>
            <p className="text-lg text-gray-300 mb-6">
              Our vision aligns with Prime Minister Sh. Narender Modi's 'One Planet One Future' philosophy expressed
              during the G-20 Summit in New Delhi in 2024, coinciding with the inclusion of the African Union as a
              permanent member in G-20 Nations.
            </p>
            <p className="text-lg text-gray-300 mb-6">We believe in the ancient Sanskrit principle:</p>
            <div className="p-4 bg-black/30 rounded-lg border border-gray-700 mb-6">
              <p className="text-2xl text-brand-orange font-semibold text-center">'सर्वे भवन्तु सुखिन, सर्वे संत निरामया।'</p>
              <p className="text-gray-300 mt-2 italic text-center">May all be happy, may all be free from illness.</p>
            </div>
            <p className="text-lg text-gray-300">
              This philosophy guides our approach to education as a fundamental human right and a pathway to global
              prosperity, peace, and understanding.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.44_4b37db4f.jpg-ScDqqphzS3uImUhoHk81xnzhd3X7rE.jpeg"
                alt="Indo-African Scholarship Vision"
                width={600}
                height={400}
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-brand-orange transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center mb-6">
                <GraduationCap className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Educational Equity</h3>
              <p className="text-gray-300">
                We believe that quality education should be accessible to all deserving students, regardless of their
                financial background or social status.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-brand-orange transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation & Excellence</h3>
              <p className="text-gray-300">
                We promote innovative thinking and academic excellence, encouraging students to explore, create, and
                contribute to their fields.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-brand-orange transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Global Perspective</h3>
              <p className="text-gray-300">
                We cultivate global citizenship and cross-cultural understanding through educational exchange between
                India and African nations.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-brand-orange transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center mb-6">
                <Handshake className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Collaborative Growth</h3>
              <p className="text-gray-300">
                We foster partnerships between educational institutions, governments, and private sectors to create
                sustainable educational ecosystems.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-brand-orange transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Social Responsibility</h3>
              <p className="text-gray-300">
                We emphasize the importance of giving back to communities and using education as a tool for positive
                social change.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-brand-orange transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Inclusive Merit</h3>
              <p className="text-gray-300">
                We recognize and reward academic potential while considering the unique challenges faced by students
                from marginalized communities.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Strategic Goals</h2>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-black flex items-center justify-center font-bold mr-3">
                    1
                  </div>
                  Short-Term Goals
                </h3>
                <ul className="space-y-3 pl-11">
                  <li className="text-gray-300 list-disc">
                    Successfully distribute 10,000+ scholarships to deserving students from the Global South
                  </li>
                  <li className="text-gray-300 list-disc">
                    Establish robust selection and support systems for scholarship recipients
                  </li>
                  <li className="text-gray-300 list-disc">
                    Create a network of educational institutions committed to the scholarship program
                  </li>
                  <li className="text-gray-300 list-disc">
                    Develop comprehensive support mechanisms for international students
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-black flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  Medium-Term Goals
                </h3>
                <ul className="space-y-3 pl-11">
                  <li className="text-gray-300 list-disc">
                    Expand the scholarship program to include more educational institutions
                  </li>
                  <li className="text-gray-300 list-disc">
                    Develop specialized programs tailored to the needs of African economies
                  </li>
                  <li className="text-gray-300 list-disc">Create alumni networks to foster ongoing collaboration</li>
                  <li className="text-gray-300 list-disc">
                    Establish research partnerships between Indian and African institutions
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-black flex items-center justify-center font-bold mr-3">
                    3
                  </div>
                  Long-Term Goals
                </h3>
                <ul className="space-y-3 pl-11">
                  <li className="text-gray-300 list-disc">
                    Build sustainable educational ecosystems that continue beyond initial funding
                  </li>
                  <li className="text-gray-300 list-disc">
                    Establish centers of excellence in key academic disciplines across participating nations
                  </li>
                  <li className="text-gray-300 list-disc">
                    Create a model for educational cooperation that can be replicated in other regions
                  </li>
                  <li className="text-gray-300 list-disc">
                    Measure and demonstrate tangible economic and social impact in participating communities
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-black flex items-center justify-center font-bold mr-3">
                    4
                  </div>
                  Impact Measurement
                </h3>
                <ul className="space-y-3 pl-11">
                  <li className="text-gray-300 list-disc">
                    Track academic performance and graduation rates of scholarship recipients
                  </li>
                  <li className="text-gray-300 list-disc">
                    Monitor career trajectories and contributions to home communities
                  </li>
                  <li className="text-gray-300 list-disc">
                    Assess economic impact through job creation and entrepreneurship metrics
                  </li>
                  <li className="text-gray-300 list-disc">
                    Evaluate strengthening of bilateral relations between India and African nations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-brand-orange/20 to-brand-blue/20 p-8 rounded-xl border border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Join Us in Realizing This Vision</h2>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Whether you're a student seeking opportunities, an educational institution looking to partner, or an
              organization wanting to support our mission, we welcome your involvement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-orange hover:bg-orange-600 text-white">
                <Link href="/scholarships">
                  Explore Scholarships <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/partners">Become a Partner</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

