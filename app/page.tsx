import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Users, BookOpen } from "lucide-react"
import HeroSection from "@/components/hero-section"
import FeaturedPrograms from "@/components/featured-programs"
import TestimonialsSection from "@/components/testimonials-section"
import NewsHighlights from "@/components/news-highlights"
import StatsCounter from "@/components/stats-counter"
import ApplicationSteps from "@/components/application-steps"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Mission</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto"></div>
          </div>

          <div className="bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-gray-800">
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              To work towards the upliftment of the common man in terms of the equal opportunities for the development
              of the Skill, Higher Education, Employability, Food Security, Job Security & the protection of the Civil
              Rights of the Citizens of Global South.
            </p>

            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex-1 bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-transform duration-300 hover:transform hover:scale-105">
                <Globe className="h-10 w-10 text-brand-orange mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
                <p className="text-gray-300">
                  Network spread across 120+ countries focusing on sustainable development in the Global South.
                </p>
              </div>

              <div className="flex-1 bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-transform duration-300 hover:transform hover:scale-105">
                <Users className="h-10 w-10 text-brand-orange mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Equal Opportunity</h3>
                <p className="text-gray-300">
                  Focusing on deprived, under-privileged, war-affected communities, single-parent wards, women, and
                  tribals.
                </p>
              </div>

              <div className="flex-1 bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-transform duration-300 hover:transform hover:scale-105">
                <BookOpen className="h-10 w-10 text-brand-orange mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Education Focus</h3>
                <p className="text-gray-300">
                  Changing the landscape of Higher Education in the Global South through 10,000+ scholarships.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl text-white mb-4 font-semibold">In the words of ancient scriptures:</p>
              <p className="text-2xl text-brand-orange font-semibold">'सर्वे भवन्तु सुखिन, सर्वे संत निरामया।'</p>
              <p className="text-gray-300 mt-2 italic">May all be happy, may all be free from illness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <FeaturedPrograms />

      {/* Stats Counter */}
      <StatsCounter />

      {/* Application Process */}
      <ApplicationSteps />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* News Highlights */}
      <NewsHighlights />

      {/* CTA Section */}
      <section className="py-20 scholarship-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Begin Your Journey Today</h2>
          <p className="text-xl text-white opacity-90 mb-10 max-w-3xl mx-auto">
            Join thousands of students benefiting from the 10,000+ India-Africa Scholarships and transform your
            educational journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-black text-lg hover:bg-gray-200">
              <Link href="/scholarships">
                Apply for Scholarship <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white text-lg hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

