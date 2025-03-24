"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { User, LogIn } from "lucide-react"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navigation = [
    { name: "Gallery", href: "/gallery" },
    { name: "News", href: "/news" },
    { name: "About Us", href: "/about-us" },
    { name: "Vision", href: "/vision" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Partners", href: "/partners" },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Indo-African Scholarships</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-white hover:text-brand-orange transition duration-150 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
            <Button variant="outline" className="ml-4">
              <User className="h-4 w-4 mr-2" />
              <span>Sign In</span>
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden">
            <button type="button" className="text-white" onClick={() => setOpen(!open)}>
              <span className="sr-only">Open main menu</span>
              {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-white hover:text-brand-orange"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="outline" className="w-full mt-4">
              <LogIn className="h-4 w-4 mr-2" />
              <span>Sign In</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

