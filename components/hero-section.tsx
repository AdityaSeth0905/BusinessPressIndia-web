"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("/pattern-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block">10,000+ Indian-African</span>
              <span className="text-transparent bg-clip-text scholarship-gradient animate-gradient">
                Scholarship Awards
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              A joint CSR initiative by AASGON and Business Press India offering 100% tuition-free scholarships to
              students from the Global South with preference to African Union Nations.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-brand-orange mr-2" />
                <span className="text-gray-200">100% Tuition Free</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-brand-orange mr-2" />
                <span className="text-gray-200">Merit-Based Selection</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-brand-orange mr-2" />
                <span className="text-gray-200">Priority for Underprivileged</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-brand-orange hover:bg-orange-600 text-black font-semibold text-lg"
              >
                <Link href="/scholarships">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg">
                <Link href="/about-us">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-4 bg-gradient-to-br from-brand-orange/20 to-brand-blue/20 rounded-xl backdrop-blur-sm border border-white/10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.44_4b37db4f.jpg-ScDqqphzS3uImUhoHk81xnzhd3X7rE.jpeg"
                alt="India-Africa Scholarship Awards"
                width={800}
                height={450}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-10 p-4 rounded-lg bg-black/80 backdrop-blur-md shadow-xl border border-gray-800 transform rotate-3 z-20 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-brand-orange text-white font-bold text-lg">
                  10K+
                </div>
                <div>
                  <p className="text-white font-semibold">Scholarships Available</p>
                  <p className="text-gray-400 text-sm">For Global South Students</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">In partnership with</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-36 h-12 relative grayscale hover:grayscale-0 transition-all">
              <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-lg">
                <span className="text-white font-semibold">AASGON</span>
              </div>
            </div>
            <div className="w-36 h-12 relative grayscale hover:grayscale-0 transition-all">
              <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-lg">
                <span className="text-white font-semibold">Business Press India</span>
              </div>
            </div>
            <div className="w-36 h-12 relative grayscale hover:grayscale-0 transition-all">
              <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-lg">
                <span className="text-white font-semibold">Africa Union</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}

export default HeroSection

