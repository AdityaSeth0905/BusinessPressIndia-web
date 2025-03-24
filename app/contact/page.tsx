"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission to a backend here
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
  }

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about the Indo-African Scholarship initiative? We're here to help. Reach out to us through
            any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gray-700/50 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Indian Admission Office</h3>
                    <p className="text-gray-300">
                      Dr. Sanjeev Seth, Director Education Development
                      <br />
                      7th Floor, Commercial Tower, Le-Meridian Hotel,
                      <br />
                      Raisina Road, New Delhi- 110001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-700/50 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email Us</h3>
                    <Link
                      href="mailto:indoafricascholarships@gmail.com"
                      className="text-gray-300 hover:text-brand-orange transition-colors"
                    >
                      indoafricascholarships@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-700/50 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Call Us</h3>
                    <p className="text-gray-300">
                      +91 123 456 7890
                      <br />
                      +91 987 654 3210
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Connect With Us</h2>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <Facebook className="h-6 w-6 text-brand-orange mr-3" />
                  <span className="text-white">Facebook</span>
                </Link>

                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <Twitter className="h-6 w-6 text-brand-orange mr-3" />
                  <span className="text-white">Twitter</span>
                </Link>

                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <Instagram className="h-6 w-6 text-brand-orange mr-3" />
                  <span className="text-white">Instagram</span>
                </Link>

                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-brand-orange mr-3" />
                  <span className="text-white">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-brand-orange" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-300 mb-6">
                  Your message has been sent successfully. We'll get back to you as soon as possible.
                </p>
                <Button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-brand-orange hover:bg-orange-600 text-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    Subject
                  </label>
                  <Select>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="scholarship">Scholarship Inquiry</SelectItem>
                      <SelectItem value="application">Application Process</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                      <SelectItem value="media">Media Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={6}
                    required
                    className="bg-gray-700/50 border-gray-600 text-white resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-brand-orange hover:bg-orange-600 text-white">
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Check Scholarship Application Status</h2>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <p className="text-lg text-gray-300 mb-6 text-center">
              Already applied for a scholarship? Check the status of your application below.
            </p>

            <div className="max-w-md mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="unique-id" className="block text-white font-medium mb-2">
                    Application ID
                  </label>
                  <Input
                    id="unique-id"
                    placeholder="Enter your unique application ID"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-white font-medium mb-2">
                    Contact Number
                  </label>
                  <Input
                    id="contact"
                    placeholder="Enter your registered contact number"
                    required
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <Button type="submit" className="w-full bg-brand-orange hover:bg-orange-600 text-white">
                  Check Status
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-brand-orange/20 to-brand-blue/20 p-8 rounded-xl border border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Have More Questions?</h2>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Our team is ready to assist you with any questions regarding the Indo-African Scholarship initiative.
            </p>
            <Button asChild size="lg" className="bg-brand-orange hover:bg-orange-600 text-white">
              <Link href="/faqs">Frequently Asked Questions</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

