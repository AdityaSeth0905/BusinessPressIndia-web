"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "John Okafor",
    country: "Nigeria",
    program: "Computer Science",
    quote:
      "The Indo-African Scholarship changed my life. I'm now pursuing my dream degree in Computer Science and gaining skills that will transform my community back home.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Sarah Mwangi",
    country: "Kenya",
    program: "Business Administration",
    quote:
      "As a first-generation college student, this opportunity has opened doors I never thought possible. The support from both Indian and African mentors has been incredible.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Emmanuel Tafari",
    country: "Ethiopia",
    program: "Medicine",
    quote:
      "Studying medicine in India has exposed me to advanced healthcare systems and practices. I'm excited to take this knowledge back to serve my community.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Grace Nkosi",
    country: "South Africa",
    program: "Renewable Energy",
    quote:
      "This scholarship program not only provided financial support but also connected me with industry leaders. The hands-on experience in renewable energy projects has been invaluable.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const next = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1)
  }

  const prev = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1)
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      next()
    }, 8000)

    return () => {
      resetTimeout()
    }
  }, [current])

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("/dots-pattern.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Student Success Stories</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our scholarship recipients and how the program has transformed their academic journey.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-full">
                    <div className="bg-gray-800/50 rounded-xl p-8 md:p-12 border border-gray-700">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/3 flex flex-col items-center">
                          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-brand-orange mb-4">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                          <p className="text-gray-400">{testimonial.country}</p>
                          <p className="text-brand-orange mt-1">{testimonial.program}</p>
                        </div>

                        <div className="md:w-2/3">
                          <Quote className="h-12 w-12 text-brand-orange opacity-30 mb-4" />
                          <p className="text-xl text-gray-200 italic mb-8">{testimonial.quote}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/60 hover:bg-brand-orange text-white p-2 rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={next}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/60 hover:bg-brand-orange text-white p-2 rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? "bg-brand-orange" : "bg-gray-600"
                }`}
                onClick={() => setCurrent(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

