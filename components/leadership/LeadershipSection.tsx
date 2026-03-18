'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const solutions = [
  {
    name: 'Business Setup',
    role: 'Core Service',
    bio: 'Streamlined support for establishing your business in the UAE — from licensing and regulatory compliance to financial planning and strategic advisory.',
    gradient: 'linear-gradient(135deg, #2D3B2A 0%, #4A6B40 100%)',
    stat: '15,000+ Setups',
  },
  {
    name: 'Immigration Services',
    role: 'Visa & Immigration',
    bio: 'Expert guidance for all your visa and immigration needs, including golden visas, residency permits, and citizenship by investment.',
    gradient: 'linear-gradient(135deg, #1A2C3B 0%, #2A4A5A 100%)',
    stat: '600+ Golden Visas',
  },
  {
    name: 'Concierge Services',
    role: 'Premium Assistance',
    bio: 'Personalized assistance to enhance your business experience in Dubai. We handle the complexities so you can stay focused on growth.',
    gradient: 'linear-gradient(135deg, #3B2A1A 0%, #6B4A2A 100%)',
    stat: '30,000+ Clients',
  },
  {
    name: 'Citizenship by Investment',
    role: 'Global Mobility',
    bio: 'Achieve global mobility through strategic investments. Our team guides you through the entire citizenship acquisition process seamlessly.',
    gradient: 'linear-gradient(135deg, #2A1A2C 0%, #4A2A5A 100%)',
    stat: '200+ Citizenships',
  },
]

export default function LeadershipSection() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null!)
  const cylinderRef = useRef<HTMLDivElement>(null!)
  const infoRef = useRef<HTMLDivElement>(null!)

  const n = solutions.length
  const theta = 360 / n
  const radius = 220

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(cylinderRef.current, {
        opacity: 0, scale: 0.8, rotateX: 20,
        duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      })
      gsap.from(infoRef.current.children, {
        opacity: 0, x: 40, stagger: 0.1, duration: 0.9,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const rotateCarousel = (newActive: number) => {
    setActive(newActive)
    gsap.to(cylinderRef.current, {
      rotateY: -newActive * theta,
      duration: 0.9,
      ease: 'power3.inOut',
    })
    gsap.from(infoRef.current.querySelectorAll('.leader-info-item'), {
      opacity: 0, x: 20, stagger: 0.06, duration: 0.5, ease: 'power2.out',
    })
  }

  const leader = solutions[active]

  return (
    <section
      ref={sectionRef}
      className="py-32 px-8 md:px-16 overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div style={{ width: 24, height: 1, background: 'var(--gold)' }} />
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>Our Team</span>
      </div>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.2rem, 5vw, 4rem)',
        fontWeight: 300,
        lineHeight: 1.1,
        color: 'var(--cream)',
        marginBottom: 80,
      }}>
        Best Business Setup Consultants In <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Dubai</em>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* 3D Cylinder */}
        <div
          style={{ perspective: '1200px', height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            ref={cylinderRef}
            style={{
              width: 260,
              height: 400,
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(-8deg) rotateY(0deg)`,
              transition: 'rotateY 0.9s',
            }}
          >
            {solutions.map((l, i) => {
              const angle = i * theta
              const isActive = i === active
              return (
                <div
                  key={l.name}
                  className="hoverable"
                  onClick={() => rotateCarousel(i)}
                  style={{
                    position: 'absolute',
                    width: 240,
                    top: 0,
                    left: '50%',
                    transform: `translateX(-50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                    cursor: 'pointer',
                    transition: 'filter 0.5s, opacity 0.5s',
                    filter: isActive ? 'none' : 'brightness(0.5)',
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  <div style={{ height: 280, background: l.gradient }} />
                  <div style={{ background: 'rgba(20,18,16,0.85)', padding: '16px 18px', backdropFilter: 'blur(8px)' }}>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>{l.role}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--cream)' }}>{l.name}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Leader info */}
        <div ref={infoRef}>
          <div className="leader-info-item" style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
            {leader.role}
          </div>
          <div
            className="leader-info-item"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: 20, lineHeight: 1.1 }}
          >
            {leader.name}
          </div>
          <p
            className="leader-info-item"
            style={{ fontSize: '0.85rem', color: 'rgba(244,239,230,0.6)', lineHeight: 1.9, marginBottom: 32 }}
          >
            {leader.bio}
          </p>

          {/* Stat */}
          <div className="leader-info-item chamfer-sm px-6 py-4 mb-10" style={{ background: 'rgba(59,130,246,0.08)', display: 'inline-block' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>Track Record</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)' }}>{leader.stat}</div>
          </div>

          {/* Nav buttons */}
          <div className="leader-info-item flex gap-3 items-center">
            <button
              className="hoverable w-12 h-12 border border-gold/40 text-gold hover:bg-gold hover:text-ink transition-all duration-300 flex items-center justify-center"
              style={{ fontSize: '1.1rem', cursor: 'pointer', background: 'none' }}
              onClick={() => rotateCarousel((active - 1 + n) % n)}
            >←</button>
            <button
              className="hoverable w-12 h-12 border border-gold/40 text-gold hover:bg-gold hover:text-ink transition-all duration-300 flex items-center justify-center"
              style={{ fontSize: '1.1rem', cursor: 'pointer', background: 'none' }}
              onClick={() => rotateCarousel((active + 1) % n)}
            >→</button>
            <div className="flex gap-2 ml-2">
              {solutions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => rotateCarousel(i)}
                  className="hoverable"
                  style={{
                    width: i === active ? 24 : 6,
                    height: 6,
                    background: i === active ? 'var(--gold)' : 'rgba(59,130,246,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    borderRadius: 3,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
