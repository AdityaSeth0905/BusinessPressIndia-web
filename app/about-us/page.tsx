import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, BookOpen } from "lucide-react"

export default function AboutUsPage() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn more about the joint CSR initiative behind the Indo-African Scholarship program.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.44_4b37db4f.jpg-ScDqqphzS3uImUhoHk81xnzhd3X7rE.jpeg"
                alt="Indo-African Scholarship Initiative"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-6">The Initiative</h2>
            <p className="text-lg text-gray-300 mb-4">
              The Indian African 10000+ Scholarships drive is a joint CSR initiative of AASGON (Africa Asia Scholars
              Global Network), Kent, UK & Business Press India, Delhi NCR, India to facilitate the Global South &
              especially African Union Countries to offer 100% Tuition Fee Free Scholarships for 10000+ young nationals.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              This initiative specifically targets students from deprived, under privileged, war hit regions, single
              parents wards, women candidates, tribals & persons living on the last corner of the society.
            </p>

            <div className="flex items-center gap-4 mb-4">
              <Globe className="h-8 w-8 text-brand-orange" />
              <div>
                <h3 className="text-xl font-bold text-white">Global Reach</h3>
                <p className="text-gray-300">Network spread across 120+ countries in the Global South</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <BookOpen className="h-8 w-8 text-brand-orange" />
              <div>
                <h3 className="text-xl font-bold text-white">Educational Excellence</h3>
                <p className="text-gray-300">Committed to changing the face of Higher Education in the Global South</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-8 mb-20 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Organizations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/30 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">AASGON</h3>
              <p className="text-gray-300 mb-4">
                Africa Asia Scholars Global Network (AASGON) is headquartered in Kent, UK with members in 120+
                countries. The network works closely on sustainable development, eradication of inequality & upliftment
                of higher education in the entire Global South.
              </p>
              <p className="text-gray-300">
                AASGON's extensive network allows for coordinated educational opportunities that bridge continents and
                cultures, creating pathways for academic excellence.
              </p>
            </div>

            <div className="bg-black/30 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Business Press India</h3>
              <p className="text-gray-300 mb-4">
                Business Press India Group is an eminent publishing house for the publication of Research Journals and
                books with direct presence in India, UK & USA. Their network extends across the Global South, Europe &
                USA.
              </p>
              <p className="text-gray-300">
                Business Press India is committed to working closely with its allies to change the face of Higher
                Education in the entire Global South for the achievement of the larger goal of eradicating inequality
                among youth.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Mission</h2>

          <div className="p-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl"></div>

            <p className="text-lg text-center text-gray-200 mb-8 relative z-10">
              To work towards the upliftment of the common man in terms of the equal opportunities for the development
              of the Skill, Higher Education, Employability, Food Security, Job Security & the protection of the Civil
              Rights of the Citizens of Global South.
            </p>

            <div className="flex justify-center mb-8">
              <div className="h-0.5 w-24 bg-brand-orange"></div>
            </div>

            <p className="text-lg text-center text-gray-200 mb-8 relative z-10">
              This initiative fulfills the dream of Prime Minister Sh. Narender Modi 'One Planet One Future' expressed
              during the G-20 Summit in New Delhi in 2024 with inclusion of African Union as permanent member
              association in G-20 Nations.
            </p>

            <div className="text-center">
              <p className="text-xl text-white mb-4 font-semibold">
                In line with the ancient scriptures quote all humans on the Earth are one family:
              </p>
              <p className="text-2xl text-brand-orange font-semibold">'सर्वे भवन्तु सुखिन, सर्वे संत निरामया।'</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join Our Initiative</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Whether you're a student looking for opportunities, an educational institution interested in partnership, or
            an organization wanting to support our mission, we welcome your involvement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-brand-orange hover:bg-orange-600 text-white">
              <Link href="/scholarships">Explore Scholarships</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

