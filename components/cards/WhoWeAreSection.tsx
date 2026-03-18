'use client'
import { useEffect, useRef, MouseEvent } from 'react'
import gsap from 'gsap'

const cards = [
  { num: '01', title: 'Integrity', desc: 'We act with honesty and integrity in everything we do.', gradient: 'linear-gradient(135deg, #1E2C2A, #2D4A42)' },
  { num: '02', title: 'Unity', desc: 'Fostering a culture of collaboration and teamwork.', gradient: 'linear-gradient(135deg, #2C2318, #4A3A28)' },
  { num: '03', title: 'Innovation', desc: 'We embrace creativity and strive for continuous improvement.', gradient: 'linear-gradient(135deg, #1A1F2C, #2A3145)' },
  { num: '04', title: 'Customer Focus', desc: 'Centricity on our clients, tailoring solutions to their unique needs.', gradient: 'linear-gradient(135deg, #2C1F1A, #4A2D28)' },
  { num: '05', title: 'Excellence', desc: 'Delivering excellence and reliability in every service we provide.', gradient: 'linear-gradient(135deg, #1C2A1A, #3A502A)' },
]

function Card3D({ card }: { card: typeof cards[0] }) {
  const wrapRef = useRef<HTMLDivElement>(null!)
  const innerRef = useRef<HTMLDivElement>(null!)
  const glowRef = useRef<HTMLDivElement>(null!)

  const onMove = (e: MouseEvent) => {
    const rect = wrapRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = (e.clientX - cx) / (rect.width / 2)
    const y = (e.clientY - cy) / (rect.height / 2)
    gsap.to(innerRef.current, { rotateY: x * 16, rotateX: -y * 12, duration: 0.3, ease: 'power2.out' })
    gsap.to(glowRef.current, { opacity: 0.6, x: x * 20, y: y * 20, duration: 0.4 })
  }

  const onLeave = () => {
    gsap.to(innerRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    gsap.to(glowRef.current, { opacity: 0, duration: 0.5 })
  }

  return (
    <div ref={wrapRef} className="card-3d hoverable relative cursor-pointer shrink-0 snap-center md:snap-align-none w-[75vw] sm:w-[50vw] md:w-auto" style={{ perspective: '1000px' }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        ref={innerRef}
        className="card-3d-inner relative overflow-hidden"
        style={{
          height: 'clamp(160px, 20vh, 240px)',
          background: card.gradient,
          clipPath: 'polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)',
        }}
      >
        <div ref={glowRef} className="absolute inset-0 pointer-events-none opacity-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.3), transparent 60%)', zIndex: 1 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(59,130,246,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }} />
        <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ zIndex: 2 }}>
          <div className="card-3d-depth">
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: 6 }}>{card.num}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', fontWeight: 400, color: 'var(--cream)', marginBottom: 6, lineHeight: 1.2 }}>{card.title}</div>
            <div style={{ fontSize: '0.68rem', color: 'rgba(244,239,230,0.55)', lineHeight: 1.6 }}>{card.desc}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Exported as plain component — no forwardRef needed
export default function WhoWeAreSection() {
  const headerRef = useRef<HTMLDivElement>(null!)
  const cardsRef = useRef<HTMLDivElement>(null!)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    // Set initial hidden state
    gsap.set(Array.from(headerRef.current.children), { opacity: 0, y: 30 })
    gsap.set(cardsRef.current.querySelectorAll('.card-3d'), { opacity: 0, y: 60, rotateX: 20 })

    const playEntrance = () => {
      if (hasPlayedRef.current) return
      hasPlayedRef.current = true

      const isMobile = window.innerWidth < 768
      const centerIdx = isMobile ? 0 : 2

      const els = Array.from(cardsRef.current.querySelectorAll('.card-3d')) as HTMLElement[]
      const cx = window.innerWidth / 2
      const containerRect = cardsRef.current.getBoundingClientRect()
      const cy = containerRect.top + containerRect.height / 2

      // Calculate perfect stacking offsets and set z-indexes
      // On mobile, card 0 is the center of attention and naturally left-most
      const zIndexes = isMobile ? [5, 4, 3, 2, 1] : [1, 2, 3, 2, 1]
      
      els.forEach((el, i) => {
        el.style.zIndex = zIndexes[i].toString()
        const rect = el.getBoundingClientRect()
        const elCx = rect.left + rect.width / 2
        const elCy = rect.top + rect.height / 2
        
        // Push all cards to the exact center, scale down slightly, and push back
        gsap.set(el, {
          x: cx - elCx,
          y: (cy - elCy) + 20, // Start slightly lower for upward elegance
          z: i === centerIdx ? 0 : -80,
          scale: 0.9,
          opacity: 0,
          rotateY: 0
        })
      })

      const centerCard = els[centerIdx]
      // Emerge order: on mobile just fan out sequentially to the right. Desktop: inner then outer.
      const sideCards = isMobile ? [els[1], els[2], els[3], els[4]] : [els[1], els[3], els[0], els[4]]

      const tl = gsap.timeline()
      
      // 1. Header fades in
      tl.to(Array.from(headerRef.current.children), {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      })

      // 2. Center card fades in and slides up slightly
      tl.to(centerCard, {
        opacity: 1,
        y: 0,
        x: 0,
        z: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out'
      }, '-=0.4')

      // 3. Side cards fan out from behind the center card, one by one
      tl.to(sideCards, {
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.7')
    }

    // Listen for the custom event dispatched by ScrollSequence
    window.addEventListener('who-we-are-enter', playEntrance)
    return () => window.removeEventListener('who-we-are-enter', playEntrance)
  }, [])

  return (
    <section
      className="relative flex flex-col justify-center px-8 md:px-16"
      style={{ height: '100vh', paddingTop: '5vh', paddingBottom: '5vh', background: 'transparent', color: 'var(--cream)' }}
    >
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 relative z-10 w-full px-4 md:px-0">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div style={{ width: 24, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>Who We Are</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1.1, color: '#000', textShadow: 'none' }}>
            Where Ambition Meets<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Opportunity</em>
          </h2>
        </div>
        <p className="max-w-xs text-left md:text-right" style={{ fontSize: '0.75rem', lineHeight: 1.8, color: '#000' }}>
          Since 2019, Unity Partners has earned a reputation as a trusted leader in business support services, dedicated to providing customized solutions.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="flex md:grid md:grid-cols-5 gap-4 relative z-10 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory px-4 md:px-0 hide-scroll"
        style={{ perspective: '1200px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card) => (
          <Card3D key={card.num} card={card} />
        ))}
      </div>
    </section>
  )
}
