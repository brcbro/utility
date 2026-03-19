'use client'
import { useEffect, useRef, MouseEvent as ReactMouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from '@/components/ui/Magnetic'

const destinations = [
  {
    id: 'dubai-mainland',
    name: 'Dubai Mainland',
    subtitle: 'Global Business Capital',
    description: 'A Dubai Mainland license allows entrepreneurs to operate their businesses both within the UAE and internationally, with access to a thriving market of over 19,000 new companies joining in Q1 2024 alone.',
    tag: 'Most Popular',
    tagColor: 'var(--gold)',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #2d5a3d 40%, #1a3a2a 100%)',
    accentGradient: 'linear-gradient(180deg, rgba(59,130,246,0.15) 0%, transparent 60%)',
    highlights: ['Operate Locally & Globally', 'No Sponsor Required', 'Full Profit Repatriation'],
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi Mainland',
    subtitle: 'Capital of Opportunity',
    description: 'Establish your presence in the UAE capital with a wide range of business activities and opportunities, backed by one of the world\'s most stable and diversified economies.',
    tag: 'Growing Market',
    tagColor: '#6BA3C8',
    gradient: 'linear-gradient(135deg, #1a1e2a 0%, #2a3a5a 40%, #1a2030 100%)',
    accentGradient: 'linear-gradient(180deg, rgba(107,163,200,0.15) 0%, transparent 60%)',
    highlights: ['Capital City Advantage', 'Sovereign Wealth Support', 'Strategic Location'],
  },
  {
    id: 'adgm',
    name: 'ADGM',
    subtitle: 'Award-Winning Fin. Centre',
    description: 'Abu Dhabi Global Market is an award-winning international financial centre, offering a world-class regulatory environment for financial institutions, fintech, and professional services.',
    tag: 'Premium Zone',
    tagColor: '#3B82F6',
    gradient: 'linear-gradient(135deg, #2a1a10 0%, #5a3a1a 40%, #3a2010 100%)',
    accentGradient: 'linear-gradient(180deg, rgba(59,130,246,0.15) 0%, transparent 60%)',
    highlights: ['English Common Law', 'Zero Tax Environment', 'Global Financial Hub'],
  },
  {
    id: 'international',
    name: 'International',
    subtitle: 'Global Expansion',
    description: 'Expand your horizons globally with our international network and expertise. We facilitate business setup and citizenship pathways across multiple jurisdictions worldwide.',
    tag: 'Worldwide',
    tagColor: '#9B8EC8',
    gradient: 'linear-gradient(135deg, #1a1020 0%, #2a1a40 40%, #1a1030 100%)',
    accentGradient: 'linear-gradient(180deg, rgba(155,142,200,0.15) 0%, transparent 60%)',
    highlights: ['200+ Citizenship Cases', 'Multi-Jurisdiction Expertise', 'Global Network'],
  },
]

function DestinationCard({ dest, index }: { dest: typeof destinations[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null!)
  const innerRef = useRef<HTMLDivElement>(null!)
  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = (e.clientX - cx) / (rect.width / 2)
    const y = (e.clientY - cy) / (rect.height / 2)

    gsap.to(innerRef.current, {
      rotateY: x * 14,
      rotateX: -y * 10,
      z: 30,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const onLeave = () => {
    gsap.to(innerRef.current, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.35)',
    })
  }

  return (
    <div
      ref={cardRef}
      className="dest-card hoverable cursor-pointer"
      style={{ perspective: '1100px' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={innerRef}
        style={{
          position: 'relative',
          height: 'clamp(380px, 42vw, 460px)',
          borderRadius: 30,
          overflow: 'hidden',
          background: '#e0e0e0', // Base color from user's CSS
          transformStyle: 'preserve-3d',
          boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
          transition: 'box-shadow 0.4s',
          border: 'none',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            '15px 15px 30px #bebebe, -15px -15px 30px #ffffff'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            '8px 8px 16px #bebebe, -8px -8px 16px #ffffff'
        }}
      >
        {/* Dot pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '28px',
            zIndex: 4,
            transform: 'translateZ(20px)',
          }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            {/* Tag */}
            <div
              style={{
                padding: '5px 14px',
                borderRadius: 999,
                background: '#e0e0e0',
                boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
                color: 'var(--ink)',
                fontSize: '0.52rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {dest.tag}
            </div>
          </div>

          {/* Bottom content */}
          <div>
            {/* Highlights chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {dest.highlights.map(h => (
                <span
                  key={h}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: '#e0e0e0',
                    boxShadow: '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
                    color: 'var(--ink)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(0,0,0,0.1)', marginBottom: 18 }} />

            {/* Name + subtitle */}
            <div style={{ marginBottom: 10 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}
              >
                {dest.name}
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  opacity: 0.7,
                  fontWeight: 500,
                }}
              >
                {dest.subtitle}
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.75rem',
                lineHeight: 1.75,
                color: 'var(--ink)',
                opacity: 0.8,
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
                overflow: 'hidden',
              }}
            >
              {dest.description}
            </p>

            {/* CTA */}
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--ink)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              <span>Learn More</span>
              <span style={{ fontSize: '0.9rem' }}>↗</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection({ onOpenProperty }: { onOpenProperty: (id: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null!)
  const headingRef = useRef<HTMLDivElement>(null!)
  const filterRef = useRef<HTMLDivElement>(null!)
  const cardsRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.children, {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })

      gsap.from(filterRef.current.children, {
        opacity: 0, y: 20, stagger: 0.07, duration: 0.6,
        scrollTrigger: { trigger: filterRef.current, start: 'top 85%' }
      })

      const cards = cardsRef.current.querySelectorAll('.dest-card')
      gsap.from(cards, {
        opacity: 0,
        y: 80,
        rotateX: 20,
        z: -200,
        stagger: 0.12,
        duration: 1.0,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 78%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#e0e0e0' }}>
      {/* Section header */}
      <div className="px-8 md:px-16 pt-32 pb-12">
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 24, height: 1, background: 'var(--gold)' }} />
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>Countries</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: 'var(--ink)',
            }}>
              Featured<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Destinations</em>
            </h2>
          </div>
          <p className="max-w-xs" style={{ fontSize: '0.8rem', color: 'rgba(20,18,14,0.6)', lineHeight: 1.9 }}>
            Explore where we operate — from Dubai Mainland to Abu Dhabi, ADGM, and international jurisdictions worldwide.
          </p>
        </div>
      </div>

      {/* Filter row */}
      <div ref={filterRef} className="px-8 md:px-16 pb-10 flex gap-3 flex-wrap">
        {['All Markets', 'Dubai Mainland', 'Abu Dhabi', 'ADGM', 'International'].map((f, i) => (
          <button
            key={f}
            className="hoverable"
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: `1px solid ${i === 0 ? 'var(--gold)' : 'rgba(20,18,14,0.15)'}`,
              color: i === 0 ? 'var(--ink)' : 'rgba(20,18,14,0.5)',
              background: i === 0 ? 'var(--gold)' : 'transparent',
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div
        ref={cardsRef}
        className="px-8 md:px-16 pb-32"
        style={{ perspective: '1800px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((d, i) => (
            <DestinationCard key={d.id} dest={d} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-16">
          <Magnetic>
            <button
              className="hoverable"
              style={{
                padding: '14px 48px',
                borderRadius: 999,
                border: '1px solid rgba(59,130,246,0.8)',
                color: 'var(--ink)',
                background: 'var(--gold)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.3s',
                backdropFilter: 'blur(8px)',
              }}
            >
              Schedule a Free Consultation →
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
