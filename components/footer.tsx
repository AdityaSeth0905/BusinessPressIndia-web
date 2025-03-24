import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-6">Indo-African Scholarships</h3>
            <p className="text-gray-400 mb-6">
              A joint CSR initiative by AASGON and Business Press India offering 10,000+ tuition-free scholarships to
              students from the Global South with preference to African Union Nations.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-brand-orange transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-brand-orange transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-brand-orange transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-brand-orange transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-brand-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-gray-400 hover:text-brand-orange transition-colors">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-brand-orange transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-brand-orange transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-400 hover:text-brand-orange transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-400 hover:text-brand-orange transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-orange" />
                <span className="text-gray-400">
                  7th Floor, Commercial Tower, Le-Meridian Hotel, Raisina Road, New Delhi- 110001, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-orange" />
                <Link
                  href="mailto:indoafricascholarships@gmail.com"
                  className="text-gray-400 hover:text-brand-orange transition-colors"
                >
                  indoafricascholarships@gmail.com
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand-orange" />
                <Link href="tel:+911234567890" className="text-gray-400 hover:text-brand-orange transition-colors">
                  +91 123 456 7890
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on scholarships and events.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button size="icon" className="bg-brand-orange hover:bg-orange-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Indo-African Scholarships. All rights reserved.
          </div>
          <div className="text-gray-400 mb-4 md:mb-0">
            Made by:{" "}
            <Link href="https://www.xyronixlabs.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Xyronix Labs
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/license" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">
              License
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

