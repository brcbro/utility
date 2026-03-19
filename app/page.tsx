'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), { ssr: false })
const WhoWeAreSection = dynamic(() => import('@/components/cards/WhoWeAreSection'), { ssr: false })
const ScrollSequence = dynamic(() => import('@/components/hero/ScrollSequence'), { ssr: false })
const ProjectsSection = dynamic(() => import('@/components/projects/ProjectsSection'), { ssr: false })
const PropertyDetail = dynamic(() => import('@/components/projects/PropertyDetail'), { ssr: false })
const LeadershipSection = dynamic(() => import('@/components/leadership/LeadershipSection'), { ssr: false })
const BlogSection = dynamic(() => import('@/components/testimonials/BlogSection'), { ssr: false })
const TestimonialsSection = dynamic(() => import('@/components/testimonials/TestimonialsSection'), { ssr: false })
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'), { ssr: false })
const Footer = dynamic(() => import('@/components/footer/Footer'), { ssr: false })
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: false })

export default function Home() {
  const [openProperty, setOpenProperty] = useState<string | null>(null)

  return (
    <main>
      <Navbar />

      <ScrollSequence
        heroContent={<HeroSection />}
        whoWeAreContent={<WhoWeAreSection />}
      />

      <div id="countries">
        <ProjectsSection onOpenProperty={(id) => setOpenProperty(id)} />
      </div>
      <div id="about-us">
        <LeadershipSection />
      </div>
      <div id="business-setup">
        <BlogSection />
      </div>
      <div id="tutorials">
        <TestimonialsSection />
      </div>
      <div id="support">
        <ContactSection />
      </div>
      <Footer />

      {openProperty && (
        <PropertyDetail
          propertyId={openProperty}
          onClose={() => setOpenProperty(null)}
        />
      )}
    </main>
  )
}
