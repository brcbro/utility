'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const posts = [
  {
    cat: 'Market Report',
    title: 'How AI Is Redefining Price Discovery in Luxury Residential',
    date: 'March 12, 2026',
    read: '6 min',
    gradient: 'linear-gradient(135deg, #1A2C1E, #2A4A30)',
  },
  {
    cat: 'Investment',
    title: 'The Off-Market Advantage: Why 34% of Our Deals Never Appear Online',
    date: 'February 28, 2026',
    read: '8 min',
    gradient: 'linear-gradient(135deg, #1A1A2C, #2A2A4A)',
  },
  {
    cat: 'Trends',
    title: 'Climate Risk Scoring: The New Frontier in Property Valuation',
    date: 'February 14, 2026',
    read: '5 min',
    gradient: 'linear-gradient(135deg, #2C1A1A, #4A2A2A)',
  },
  {
    cat: 'Technology',
    title: 'From Spreadsheets to Neural Networks: A Decade of PropTech',
    date: 'January 30, 2026',
    read: '10 min',
    gradient: 'linear-gradient(135deg, #1A2C2A, #2A4A48)',
  },
]

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null!)
  const trackRef = useRef<HTMLDivElement>(null!)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Calculate total width of one set of cards (including gap) to know how far to translate before looping
    // Assuming gap-7 (28px) and card widths are known, but we can animate -50% since we duplicated the content
    
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from('.blog-card-original', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        onComplete: () => {
          // Start the infinite scroll AFTER the entrance animation
          startInfiniteScroll()
        }
      })
    }, sectionRef)

    const startInfiniteScroll = () => {
      if (tweenRef.current) tweenRef.current.kill()
      
      // Animate exactly 50% of the total width (which equals one full original set)
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 20, // Adjust speed here
        repeat: -1,
      })
      
      if (isHovered) tweenRef.current.pause()
    }

    return () => {
      ctx.revert()
      if (tweenRef.current) tweenRef.current.kill()
    }
  }, []) // Empty dep array for one-time setup

  // Handle hover state changes
  useEffect(() => {
    if (tweenRef.current) {
      if (isHovered) {
        tweenRef.current.pause()
      } else {
        tweenRef.current.play()
      }
    }
  }, [isHovered])

  // We duplicate the posts array so we can scroll infinitely without a visual break
  const duplicatedPosts = [...posts, ...posts]

  return (
    <section ref={sectionRef} className="py-32 overflow-hidden" style={{ background: 'var(--surface)' }}>
      <div className="px-8 md:px-16 mb-14">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 24, height: 1, background: 'var(--gold)' }} />
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>Insights</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: 'var(--ink)',
            }}>
              Market <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Intelligence</em>
            </h2>
          </div>
          <button
            className="hoverable hidden md:block"
            style={{
              padding: '12px 28px',
              border: '1px solid rgba(20,18,16,0.2)',
              background: 'none',
              color: 'var(--ink)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.3s',
            }}
          >
            All Articles →
          </button>
        </div>
      </div>

      {/* Wrapping continuous container */}
      <div 
        className="relative py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={trackRef} 
          className="flex gap-7 px-8 md:px-16" 
          style={{ width: 'max-content' }}
        >
          {duplicatedPosts.map((post, i) => (
            <div
              key={i}
              className={`blog-card cursor-pointer group flex-shrink-0 ${i < posts.length ? 'blog-card-original' : 'blog-card-clone'}`}
              style={{ width: 'clamp(280px, 30vw, 360px)' }}
            >
              <div
                className="mb-6 overflow-hidden"
                style={{ height: 'clamp(180px, 20vw, 240px)' }}
              >
                <div
                  style={{ width: '100%', height: '100%', background: post.gradient, transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  className="group-hover:scale-105"
                />
              </div>
              <div
                style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}
              >
                {post.cat}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  lineHeight: 1.3,
                  marginBottom: 12,
                }}
              >
                {post.title}
              </h3>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>
                {post.date} · {post.read} read
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

