"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const StatsCounter = () => {
  const [scholarships, setScholarships] = useState(0)
  const [countries, setCountries] = useState(0)
  const [years, setYears] = useState(0)
  const [campuses, setCampuses] = useState(0)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const scholarshipsInterval = setInterval(() => {
        setScholarships((prev) => {
          const newValue = prev + 100
          if (newValue >= 10000) {
            clearInterval(scholarshipsInterval)
            return 10000
          }
          return newValue
        })
      }, 20)

      const countriesInterval = setInterval(() => {
        setCountries((prev) => {
          const newValue = prev + 1
          if (newValue >= 120) {
            clearInterval(countriesInterval)
            return 120
          }
          return newValue
        })
      }, 50)

      const yearsInterval = setInterval(() => {
        setYears((prev) => {
          const newValue = prev + 1
          if (newValue >= 20) {
            clearInterval(yearsInterval)
            return 20
          }
          return newValue
        })
      }, 200)

      const campusesInterval = setInterval(() => {
        setCampuses((prev) => {
          const newValue = prev + 1
          if (newValue >= 50) {
            clearInterval(campusesInterval)
            return 50
          }
          return newValue
        })
      }, 100)

      return () => {
        clearInterval(scholarshipsInterval)
        clearInterval(countriesInterval)
        clearInterval(yearsInterval)
        clearInterval(campusesInterval)
      }
    }
  }, [isInView])

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Impact of Our Initiative</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our scholarship program is transforming lives across the Global South with a focus on African Union nations.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl font-bold text-brand-orange mb-4">{scholarships.toLocaleString()}+</div>
            <div className="text-xl text-white">Scholarships</div>
            <p className="text-gray-400 mt-2">Available for students across the Global South</p>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-5xl font-bold text-brand-orange mb-4">{countries}+</div>
            <div className="text-xl text-white">Countries</div>
            <p className="text-gray-400 mt-2">Network spread across the Global South</p>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-5xl font-bold text-brand-orange mb-4">{years}+</div>
            <div className="text-xl text-white">Years Experience</div>
            <p className="text-gray-400 mt-2">Of transforming educational opportunities</p>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-5xl font-bold text-brand-orange mb-4">{campuses}+</div>
            <div className="text-xl text-white">Partner Campuses</div>
            <p className="text-gray-400 mt-2">Across India and Global South</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default StatsCounter

