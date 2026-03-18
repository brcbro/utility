'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from '@/components/ui/Magnetic'

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null!)
  const imgRef = useRef<HTMLDivElement>(null!)
  const formRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        opacity: 0, x: -60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
      gsap.from(formRef.current.children, {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const inputStyle = {
    width: '100%',
    padding: '14px 0',
    border: 'none',
    borderBottom: '1px solid rgba(20,18,16,0.15)',
    background: 'transparent',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderBottomColor = 'var(--gold)'
    e.target.style.boxShadow = '0 1px 0 0 var(--gold)'
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderBottomColor = 'rgba(20,18,16,0.15)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section
      ref={sectionRef}
      className="py-32 px-8 md:px-16"
      style={{ background: 'var(--cream)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* Image panel */}
        <div
          ref={imgRef}
          className="relative overflow-hidden"
          style={{
            height: 'clamp(360px, 55vh, 580px)',
            background: 'linear-gradient(160deg, #2C2318 0%, #1A1714 50%, #2A4A3A 100%)',
            clipPath: 'polygon(0 24px, 24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 40% 30%, rgba(59,130,246,0.18) 0%, transparent 60%)',
            }}
          />
          {/* Quote overlay */}
          <div className="absolute bottom-12 left-10 right-10">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', color: 'rgba(59,130,246,0.2)', lineHeight: 1 }}>"</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontStyle: 'italic', color: 'rgba(244,239,230,0.7)', lineHeight: 1.6 }}>
              Your success story begins here.
            </p>
          </div>
        </div>

        {/* Form */}
        <div ref={formRef}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 24, height: 1, background: 'var(--gold)' }} />
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>Contact</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: 'var(--ink)',
              marginBottom: 44,
            }}>
              Begin Your<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Journey</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>First Name</label>
              <input type="text" placeholder="Alexandra" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>Last Name</label>
              <input type="text" placeholder="Voss" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>Email Address</label>
            <input type="email" placeholder="your@email.com" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>Service Interest</label>
            <input type="text" placeholder="e.g. Business Setup, Visa" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>

          <div style={{ marginBottom: 40 }}>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>Message</label>
            <input type="text" placeholder="Tell us what you're looking for..." style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>

          <Magnetic strength={0.35}>
            <button
              className="hoverable chamfer"
              style={{
                padding: '16px 52px',
                background: 'var(--ink)',
                color: 'var(--cream)',
                border: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--cream)' }}
            >
              Apply Now →
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
