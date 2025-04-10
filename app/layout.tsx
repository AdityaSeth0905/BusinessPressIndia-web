import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Indo-African Scholarships",
  description: "Business Press x AASGON Presents 10,000+ Scholarships for the Global South and African Union Nations",
    generator: 'Xyronix Labs'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add favicon */}
        <link rel="icon" href="/BPI.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/BPI.png" type="image/x-icon"/>
      </head>
      <body className={`${inter.className} dark min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'