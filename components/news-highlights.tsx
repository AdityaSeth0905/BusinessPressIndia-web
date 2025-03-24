import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const NewsHighlights = () => {
  const news = [
    {
      id: 1,
      title: "Nigeria Poised to Benefit from AASGON's 10,000 India-Africa Scholarship Awards",
      excerpt:
        "Students from Nigeria are set to benefit from the new 10,000 scholarship initiative launched by AASGON and Business Press India.",
      date: "March 20, 2025",
      source: "Daylight Reporters",
      link: "https://ground.news/article/nigeria-poised-to-benefit-from-aasgons-10-000-india-africa-scholarship-awards-daylight-reporters",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Nigeria To Benefit From AASGON's 10,000 India-Africa Scholarship Initiative",
      excerpt:
        "The Africa-Asia Scholars Global Network (AASGON) has unveiled a scholarship program offering 10,000 scholarships to African students.",
      date: "March 20, 2025",
      source: "Tech TV Network",
      link: "https://techtvnetwork.ng/2025/03/20/nigeria-to-benefit-from-aasgons-10000-india-africa-scholarship-initiative/",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "AASGON Launches Massive Scholarship Program for African Students",
      excerpt:
        "AASGON partners with Business Press India to offer tuition-free education opportunities to students from African Union nations.",
      date: "March 22, 2025",
      source: "Kaye Mo News",
      link: "https://kayemonews.com/nigeria-to-benefit-from-aasgons-10000-india-africa-scholarship-awards/",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Latest News</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest developments and announcements about our scholarship initiative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-brand-orange transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 bg-brand-orange text-black px-3 py-1 text-sm font-medium">
                  {item.source}
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-400 text-sm mb-2">{item.date}</div>
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{item.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{item.excerpt}</p>
                <div className="flex items-center text-brand-orange font-medium">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <Link href="/news">View All News</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewsHighlights

