'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from '@/components/ui/Magnetic'


function splitTextToChars(element: HTMLElement) {
  const text = element.textContent || ''
  element.innerHTML = text
    .split('')
    .map((char) =>
      char === ' '
        ? '<span style="display:inline-block;width:0.3em">&nbsp;</span>'
        : `<span class="char-wrap"><span class="char">${char}</span></span>`
    )
    .join('')
  return element.querySelectorAll<HTMLSpanElement>('.char')
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null!)
  const headingRef = useRef<HTMLHeadingElement>(null!)
  const subRef = useRef<HTMLParagraphElement>(null!)
  const tagRef = useRef<HTMLDivElement>(null!)
  const actionsRef = useRef<HTMLDivElement>(null!)
  const statsRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Split heading chars
    const chars = splitTextToChars(headingRef.current)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Tag line fade
      tl.from(tagRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, 0.2)

      // Char flip-up reveal
      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.028,
        duration: 0.7,
        ease: 'back.out(1.4)',
      }, 0.4)

      // Sub text
      tl.from(subRef.current, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, 0.9)

      // Actions
      tl.from(actionsRef.current.children, {
        opacity: 0, y: 20, stagger: 0.12, duration: 0.6, ease: 'power3.out'
      }, 1.1)

      // Stats
      tl.from(statsRef.current.children, {
        opacity: 0, y: 16, stagger: 0.1, duration: 0.5, ease: 'power3.out'
      }, 1.3)

      // Scroll-out parallax
      gsap.to([headingRef.current, subRef.current], {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex flex-col justify-between overflow-hidden pt-32 pb-16"
      style={{ background: 'transparent' }}
    >
      {/* Dark gradient vignette for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          zIndex: 1
        }}
      />


      {/* Hero Content */}
      <div className="relative z-10 px-8 md:px-16 flex-1 flex flex-col justify-center max-w-3xl">
        <div ref={tagRef} className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
          <div style={{ width: 32, height: 1, background: 'var(--gold)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Premium Business Set Up Services.
          </span>
        </div>

        <h1
          ref={headingRef}
          className="mb-7"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            lineHeight: 1.0,
            color: 'var(--cream)',
            perspective: '800px',
            textShadow: '0 4px 40px rgba(0,0,0,0.8)',
          }}
        >
          Your Success Story Begins Here
        </h1>

        <p
          ref={subRef}
          className="mb-12 max-w-md text-cream/50"
          style={{ fontSize: '0.85rem', lineHeight: 1.9, opacity: 0 }}
        >
          Explore new possibilities with our seamless Premium Business Set Up Services.
        </p>

        <div ref={actionsRef} className="flex gap-5 items-center">
          <Magnetic strength={0.3}>
            <button
              className="hoverable chamfer px-10 py-4 bg-gold text-ink font-medium hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0 }}
            >
              Apply Now
            </button>
          </Magnetic>
          <button
            className="hoverable flex items-center gap-2 text-cream/50 hover:text-cream transition-colors duration-300"
            style={{ fontSize: '0.7rem', letterSpacing: '0.08em', opacity: 0 }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1"/>
              <polygon points="13,10 22,16 13,22" fill="currentColor"/>
            </svg>
            Cost Calculator
          </button>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="relative z-10 flex gap-12 px-8 md:px-16 pb-12">
        {[
          { num: '15,000+', label: 'Business Setups' },
          { num: '600+', label: 'Golden Visas' },
          { num: '30,000+', label: 'Concierge Services' },
        ].map(s => (
          <div key={s.label} style={{ opacity: 0 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 300,
              color: 'var(--gold)',
            }}>{s.num}</div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.35)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: 0.4 }}
      >
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream)' }}>Scroll</div>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
      </div>
    </section>
  )
}
