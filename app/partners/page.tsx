import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Handshake } from "lucide-react"

export default function PartnersPage() {
  const partners = [
    {
      category: "Educational Institutions",
      entities: [
        { name: "Sanskriti University", location: "Mathura, Uttar Pradesh", logo: "/sanskritiuniversity.ico" },
        { name: "World University of Design", location: "Sonipat, Haryana", logo: "/wud.png" },
        {
          name: "RIMT University",
          location: "Mandi, Punjab",
          logo: "/rimt.png",
        },
        { name: "Ryat Bahra University", location: "Mohali, Punjab", logo: "/ryatbarah.png" },
        { name: "Bahara University", location: "Shimla, Himachal Pradesh", logo: "/baharauniversity.png" },
        {
          name: "Indus International University",
          location: "Una, Himachal Pradesh",
          logo: "/IndusInternationalUniversity.png",
        },
        {
          name: "Renaissance University",
          location: "Indore, Madhya Pradesh",
          logo: "/RenaissanceUniversity.png",
        },
        {
          name: "Abhyuday University",
          location: "Khargone, Madhya Pradesh",
          logo: "/AbhyudayUniversity.png",
        },
        {
          name: "Universal Group of Institutions",
          location: "Mohali, Punjab",
          logo: "/placeholder.svg?height=100&width=180",
        },
      ],
    },
    {
      category: "International Organizations",
      entities: [
        { name: "Africa Union", location: "Addis Ababa, Ethiopia", logo: "africaunion.ico" },
        { name: "UNESCO", location: "Paris, France", logo: "/unesco.ico" },
        { name: "World Bank Education", location: "Washington DC, USA", logo: "/worldbankeducation.png" },
        
      ],
    },
    {
      category: "NGOs and Foundations",
      entities: [
        { name: "AASGON", location: "Kent, UK", logo: "/aasgon.png" },
        { name: "Business Press India", location: "Delhi NCR, India", logo: "/BPI.png" },
        {
          name: "Global South Foundation",
          location: "Johannesburg, South Africa",
          logo: "/placeholder.svg?height=100&width=180",
        },
      ],
    },
    {
      category: "Digital Partner",
      entities: [
        { name: "Xyronix Labs", location: "Delhi NCR, India", logo: "/xyronixlabs.png" },
        
      ],
    }
  ]

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Partners</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The Indo-African Scholarship initiative is made possible through collaboration with various educational
            institutions, organizations, and corporations dedicated to educational advancement.
          </p>
        </div>

        <div className="mb-20">
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3">
                <div className="rounded-full bg-brand-orange/20 p-8 w-32 h-32 mx-auto flex items-center justify-center">
                  <Handshake className="h-16 w-16 text-brand-orange" />
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold text-white mb-4">Partnership Approach</h2>
                <p className="text-gray-300 mb-4">
                  Our initiative thrives through strategic partnerships with educational institutions, governmental
                  bodies, NGOs, and corporate sponsors who share our vision of providing quality education to
                  underserved communities.
                </p>
                <p className="text-gray-300">
                  Together, we're creating pathways for academic excellence, skill development, and cross-cultural
                  understanding between India and African nations, fostering the next generation of global leaders.
                </p>
              </div>
            </div>
          </div>

          {partners.map((category, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4">
                {category.category}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.entities.map((partner, pIndex) => (
                  <div
                    key={pIndex}
                    className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 hover:border-brand-orange transition-colors group"
                  >
                    <div className="h-20 flex items-center justify-center mb-4 bg-white/5 rounded-lg p-4">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        width={180}
                        height={100}
                        className="max-h-full w-auto object-contain "
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{partner.name}</h3>
                    <p className="text-gray-400 text-sm">{partner.location}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-brand-orange/20 to-brand-blue/20 p-8 rounded-xl border border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Become a Partner</h2>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Join our network of partners in this transformative educational initiative. Together, we can create more
              opportunities for deserving students from the Global South.
            </p>
            <Button asChild size="lg" className="bg-brand-orange hover:bg-orange-600 text-white">
              <Link href="/contact">
                Partner With Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

