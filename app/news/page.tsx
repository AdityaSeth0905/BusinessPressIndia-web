import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "Nigeria Poised to Benefit from AASGON's 10,000 India-Africa Scholarship Awards",
      excerpt:
        "Nigeria is set to benefit from the new 10,000 scholarship initiative launched by AASGON and Business Press India. This groundbreaking program aims to provide 100% tuition-free education to deserving students across Africa.",
      date: "March 20, 2025",
      source: "Daylight Reporters",
      link: "https://ground.news/article/nigeria-poised-to-benefit-from-aasgons-10-000-india-africa-scholarship-awards-daylight-reporters",
      image: "/placeholder.svg?height=200&width=400",
      category: "Announcements",
    },
    {
      id: 2,
      title: "Nigeria To Benefit From AASGON's 10,000 India-Africa Scholarship Initiative",
      excerpt:
        "The Africa-Asia Scholars Global Network (AASGON) has unveiled a scholarship program offering 10,000 scholarships to African students. This initiative, backed by Business Press India, focuses on providing quality education to underprivileged students.",
      date: "March 20, 2025",
      source: "Tech TV Network",
      link: "https://techtvnetwork.ng/2025/03/20/nigeria-to-benefit-from-aasgons-10000-india-africa-scholarship-initiative/",
      image: "/placeholder.svg?height=200&width=400",
      category: "Press Coverage",
    },
    {
      id: 3,
      title: "AASGON Launches Massive Scholarship Program for African Students",
      excerpt:
        "AASGON partners with Business Press India to offer tuition-free education opportunities to students from African Union nations. The program aims to bridge educational gaps and provide opportunities to those from underprivileged backgrounds.",
      date: "March 22, 2025",
      source: "Kaye Mo News",
      link: "https://kayemonews.com/nigeria-to-benefit-from-aasgons-10000-india-africa-scholarship-awards/",
      image: "/placeholder.svg?height=200&width=400",
      category: "Announcements",
    },
    {
      id: 4,
      title: "GSUA '25 Summit to Highlight Indo-African Educational Partnerships",
      excerpt:
        "The upcoming GSUA '25 Summit in London will feature special recognition for the groundbreaking 10,000 scholarship initiative between India and African nations, highlighting the importance of cross-continental educational collaboration.",
      date: "March 18, 2025",
      source: "Education Weekly",
      link: "#",
      image: "/placeholder.svg?height=200&width=400",
      category: "Events",
    },
    {
      id: 5,
      title: "Educational Bridge: How the Indo-African Scholarship Program is Transforming Lives",
      excerpt:
        "An in-depth look at how the 10,000 scholarship initiative is already making an impact in communities across Africa, with stories from early beneficiaries and their educational journeys in India.",
      date: "March 15, 2025",
      source: "Global Education Report",
      link: "#",
      image: "/placeholder.svg?height=200&width=400",
      category: "Feature Stories",
    },
    {
      id: 6,
      title: "Business Press India Expands Educational CSR Initiatives Across Global South",
      excerpt:
        "Business Press India announces expanded commitment to educational development in the Global South, with the Indo-African Scholarship program serving as its flagship initiative for 2025 and beyond.",
      date: "March 10, 2025",
      source: "CSR Today",
      link: "#",
      image: "/placeholder.svg?height=200&width=400",
      category: "Press Releases",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">News & Updates</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay informed about the latest developments, announcements, and success stories from the Indo-African
            Scholarship initiative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <Card
              key={article.id}
              className="bg-gray-800/50 border-gray-700 hover:border-brand-orange transition-colors overflow-hidden news-card"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-brand-orange text-black px-3 py-1 text-sm font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {article.date}
                </div>
                <CardTitle className="text-white hover:text-brand-orange transition-colors">
                  <Link href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-gray-400 flex items-center">
                  <Link2 className="h-4 w-4 mr-1" />
                  Source: {article.source}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-300">{article.excerpt}</p>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="text-white border-gray-600 hover:bg-brand-orange hover:text-black hover:border-brand-orange"
                >
                  <Link href={article.link} target="_blank" rel="noopener noreferrer">
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-300 mb-6">
            Follow us on social media and subscribe to our newsletter to stay updated with the latest news and
            developments.
          </p>
          <Button asChild className="bg-brand-orange hover:bg-orange-600 text-white">
            <Link href="/contact">Subscribe to Updates</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

