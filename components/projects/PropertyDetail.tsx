'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { properties } from '@/lib/properties'

const FloorplanViewer = dynamic(() => import('./FloorplanViewer'), { ssr: false })

export default function PropertyDetail({
  propertyId,
  onClose,
}: {
  propertyId: string | null
  onClose: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null!)
  const contentRef = useRef<HTMLDivElement>(null!)
  const property = properties.find(p => p.id === propertyId)

  useEffect(() => {
    if (!propertyId) return
    const el = overlayRef.current

    gsap.fromTo(el,
      { y: '100%' },
      { y: '0%', duration: 0.75, ease: 'power4.inOut' }
    )
    gsap.from(contentRef.current.children, {
      opacity: 0, y: 30, stagger: 0.08, duration: 0.7,
      ease: 'power3.out', delay: 0.4
    })
  }, [propertyId])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      y: '100%',
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: onClose
    })
  }

  if (!property) return null

  return (
    <div
      ref={overlayRef}
      className="detail-page"
      style={{ position: 'fixed', inset: 0, zIndex: 490, background: 'var(--cream)', color: 'var(--ink)', overflowY: 'auto', transform: 'translateY(100%)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 md:px-16 py-8 sticky top-0 z-10" style={{ background: 'var(--cream)', borderBottom: '1px solid rgba(20,18,16,0.08)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          AE<span style={{ color: 'var(--gold)' }}>R</span>O
          <span style={{ opacity: 0.4, fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 300, letterSpacing: '0.05em' }}> / Properties</span>
        </div>
        <button
          className="hoverable w-11 h-11 border border-ink/20 flex items-center justify-center text-lg hover:bg-ink hover:text-cream transition-all duration-300"
          onClick={handleClose}
          style={{ cursor: 'pointer', background: 'none', fontFamily: 'var(--font-sans)' }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div ref={contentRef} className="px-8 md:px-16 py-16">

        {/* Hero image */}
        <div
          className="w-full mb-14 relative overflow-hidden"
          style={{ height: 'clamp(300px, 50vh, 520px)', background: property.gradient }}
        >
          <div className="absolute bottom-10 left-10 text-cream">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, opacity: 0.9 }}>
              {property.name}
            </div>
          </div>
        </div>

        {/* Info row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginBottom: 10 }}>
              {property.name}
            </h1>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: 20 }}>
              {property.price}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.9 }}>{property.desc}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Bedrooms', val: property.beds },
              { label: 'Bathrooms', val: property.baths },
              { label: 'Total Area', val: `${property.sqft} ft²` },
              { label: 'Year Built', val: property.year },
            ].map(s => (
              <div key={s.label} className="chamfer-sm p-5" style={{ background: 'var(--surface)' }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300 }}>
                  {s.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Masonry gallery */}
        <div className="mb-16">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, marginBottom: 20 }}>
            Exterior & Grounds
          </h3>
          <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: 'auto' }}>
            <div style={{ gridRow: 'span 2', height: 412, background: property.gradient, opacity: 0.9 }} />
            <div style={{ height: 200, background: property.gradient, filter: 'hue-rotate(20deg)', opacity: 0.8 }} />
            <div style={{ height: 200, background: property.gradient, filter: 'hue-rotate(-20deg)', opacity: 0.7 }} />
            <div style={{ gridColumn: 'span 2', height: 200, background: property.gradient, filter: 'brightness(0.85)', opacity: 0.9 }} />
          </div>
        </div>

        {/* 3D Floorplan */}
        <div className="mb-16">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, marginBottom: 20 }}>
            3D Floor Plan
          </h3>
          <FloorplanViewer />
        </div>

        {/* Sticky nav */}
        <div className="sticky bottom-6 flex justify-center z-20">
          <div className="flex gap-1" style={{ background: 'var(--ink)', padding: '6px' }}>
            {['About', 'Exterior', 'Interior', 'Floor Plans'].map((label, i) => (
              <button
                key={label}
                className="hoverable"
                style={{
                  padding: '10px 22px',
                  background: i === 0 ? 'var(--gold)' : 'none',
                  color: i === 0 ? 'var(--ink)' : 'rgba(244,239,230,0.5)',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
