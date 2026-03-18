'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const testimonials = [
  {
    quote: 'Unity Partners is known for providing high-quality services and strong client support. Their employees, Mirella and Salim, stand out for their professionalism and dedication.',
    name: 'Ahmad Reshad Salehi',
    role: 'Client, 2024',
    initials: 'AS',
    gradient: 'linear-gradient(135deg, #2D3B2A, #4A6B40)',
  },
  {
    quote: 'Angel and Salim made the process of getting equivalency certificate straightforward and easy. They were helpful, responsive, and handled everything efficiently.',
    name: 'Rachel Ann Estacio',
    role: 'Client, 2024',
    initials: 'RE',
    gradient: 'linear-gradient(135deg, #1A2C3B, #2A4A5A)',
  },
  {
    quote: 'Seamless experience, Mirella and Salim handled my golden visa application from start to finish, highly recommended 10/10!',
    name: 'Mohammad Ikhlaif',
    role: 'Golden Visa Client, 2024',
    initials: 'MI',
    gradient: 'linear-gradient(135deg, #3B2A1A, #6B4A2A)',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const sectionRef = useRef<HTMLElement>(null!)
  const quoteRef = useRef<HTMLDivElement>(null!)
  const authorRef = useRef<HTMLDivElement>(null!)
  const bgQ1Ref = useRef<HTMLDivElement>(null!)
  const bgQ2Ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Parallax background elements on scroll velocity
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const vel = self.getVelocity() / 500
          gsap.to(bgQ1Ref.current, { y: -self.progress * 80, duration: 0.5, ease: 'power1.out' })
          gsap.to(bgQ2Ref.current, { y: self.progress * 60, duration: 0.5, ease: 'power1.out' })
        },
      })

      gsap.from(quoteRef.current, {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const changeTo = (idx: number) => {
    if (transitioning || idx === current) return
    setTransitioning(true)

    // Liquid blur-fade out
    gsap.to([quoteRef.current, authorRef.current], {
      opacity: 0,
      filter: 'blur(8px)',
      x: -20,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(idx)
        // Fade in
        gsap.to([quoteRef.current, authorRef.current], {
          opacity: 1,
          filter: 'blur(0px)',
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => setTransitioning(false),
        })
      },
    })
  }

  const t = testimonials[current]

  return (
    <section
      ref={sectionRef}
      className="py-32 px-8 md:px-16 overflow-hidden relative"
      style={{ background: 'var(--ink)' }}
    >
      {/* Parallax quote marks */}
      <div
        ref={bgQ1Ref}
        className="absolute pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28rem',
          color: 'rgba(59,130,246,0.04)',
          top: '-60px',
          left: '-20px',
          lineHeight: 1,
        }}
      >
        "
      </div>
      <div
        ref={bgQ2Ref}
        className="absolute pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '14rem',
          color: 'rgba(59,130,246,0.03)',
          bottom: '20px',
          right: '40px',
          lineHeight: 1,
        }}
      >
        "
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="flex items-center gap-3 justify-center mb-14">
          <div style={{ width: 24, height: 1, background: 'var(--gold)' }} />
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>Client Testimonials — Rated Excellent</span>
          <div style={{ width: 24, height: 1, background: 'var(--gold)' }} />
        </div>

        {/* Quote */}
        <div ref={quoteRef}>
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.65,
              color: 'var(--cream)',
              marginBottom: 44,
            }}
          >
            "{t.quote}"
          </blockquote>
        </div>

        {/* Author */}
        <div ref={authorRef} className="flex items-center justify-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: t.gradient,
              border: '2px solid var(--gold)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: 'rgba(244,239,230,0.7)',
            }}
          >
            {t.initials}
          </div>
          <div className="text-left">
            <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--cream)', marginBottom: 2 }}>{t.name}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{t.role}</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            className="hoverable w-11 h-11 border border-gold/40 text-gold hover:bg-gold hover:text-ink transition-all duration-300 flex items-center justify-center"
            style={{ fontSize: '1.1rem', cursor: 'pointer', background: 'none' }}
            onClick={() => changeTo((current - 1 + testimonials.length) % testimonials.length)}
          >←</button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className="hoverable"
                onClick={() => changeTo(i)}
                style={{
                  width: i === current ? 24 : 6,
                  height: 6,
                  background: i === current ? 'var(--gold)' : 'rgba(59,130,246,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.35s',
                  borderRadius: 3,
                }}
              />
            ))}
          </div>

          <button
            className="hoverable w-11 h-11 border border-gold/40 text-gold hover:bg-gold hover:text-ink transition-all duration-300 flex items-center justify-center"
            style={{ fontSize: '1.1rem', cursor: 'pointer', background: 'none' }}
            onClick={() => changeTo((current + 1) % testimonials.length)}
          >→</button>
        </div>
      </div>
    </section>
  )
}
