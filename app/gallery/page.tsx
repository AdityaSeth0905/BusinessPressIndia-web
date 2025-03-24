import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GalleryPage() {
  const galleryImages = [
    {
      id: 1,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.46_e11e5784.jpg-8P2vayVfHFC99cDhW3XJCklC7vKJsu.jpeg",
      alt: "Indo-African Scholarship Event",
      caption: "Officials and dignitaries at an Indo-African Scholarship event",
    },
    {
      id: 2,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.45_e60008c4.jpg-Cn5796BocsVk62Fn5N5Jf1rQzyfgdD.jpeg",
      alt: "Collaborative meeting between Indian and African officials",
      caption: "Representatives from India and Africa discussing scholarship opportunities",
    },
    {
      id: 3,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.44_d7b1d390.jpg-VC2PlTDLbjWutAVGhEgfveE74nHvVF.jpeg",
      alt: "GSUA Summit and World Press Conference",
      caption: "GSUA '25 Summit Awards & Expo announcement in London",
    },
    {
      id: 4,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.45_2539793f.jpg-sQhwS3D8MJn7vqkksyk6QdA7WCo9BJ.jpeg",
      alt: "Indian Open Polo Championship",
      caption: "Partnership meeting at the Indian Open Polo Championship",
    },
    {
      id: 5,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.44_4b37db4f.jpg-ScDqqphzS3uImUhoHk81xnzhd3X7rE.jpeg",
      alt: "10,000 India-Africa Scholarship Awards",
      caption: "Official promotional banner for the 10,000 India-Africa Scholarship Awards",
    },
    {
      id: 6,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.46_c65174d9.jpg-7hh8WDF8UboehDJEc6GO8lfPhtfXXx.jpeg",
      alt: "Delegates at Indo-African event",
      caption: "International delegates at an India-Africa collaboration event",
    },
    {
      id: 7,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.46_40aabe5d.jpg-GgJ5Dspa0NQm6nYK8YKGvMiHMjmuq3.jpeg",
      alt: "Officials at formal gathering",
      caption: "Representatives from African and Indian educational institutions",
    },
    {
      id: 8,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.45_ccf44aea.jpg-RPx16RoPZ7s8YFwadYVAXBdb74uxyQ.jpeg",
      alt: "Collaborative meeting",
      caption: "Cross-cultural exchange at the scholarship program launch",
    },
    {
      id: 9,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.45_a3f76d09.jpg-A2qtoFy0NnxBPBrzUMwKOZf8yz52Rc.jpeg",
      alt: "Evening reception for scholarship program",
      caption: "Evening networking event for the scholarship initiative",
    },
    {
      id: 10,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-24%20at%2022.17.46_8100385c.jpg-5GIps9uebAxdPuL8a3eKXrulvGCzS6.jpeg",
      alt: "Partnership at sporting event",
      caption: "Building educational ties at the Indian Open Polo Championship",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore images from our events, partnerships, and initiatives fostering educational collaboration between
            India and African nations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 hover:border-brand-orange transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover gallery-image"
                />
              </div>

              <div className="p-4 bg-gray-800/90 backdrop-blur-sm">
                <p className="text-gray-200 text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-300 mb-6">
            These images capture the spirit of collaboration and educational diplomacy that drives the Indo-African
            Scholarship initiative.
          </p>
          <Button asChild className="bg-brand-orange hover:bg-orange-600 text-white">
            <Link href="/about-us">Learn More About Our Initiative</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

