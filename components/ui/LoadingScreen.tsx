'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null!)
  const topRef = useRef<HTMLDivElement>(null!)
  const bottomRef = useRef<HTMLDivElement>(null!)
  const textContainerRef = useRef<HTMLDivElement>(null!)
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([])
  const progressContainerRef = useRef<HTMLDivElement>(null!)
  const progressLineRef = useRef<HTMLDivElement>(null!)
  const counterRef = useRef<HTMLDivElement>(null!)
  
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    // Lock native body scroll as an extra precaution
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      }
    })

    // 1. Initial State
    gsap.set(letterRefs.current, { opacity: 0, y: 40 })
    gsap.set(progressContainerRef.current, { opacity: 0, y: 20 })
    gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: 'left center' })

    // 2. Letters Tracking In
    tl.to(letterRefs.current, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.2
    })
    
    // 3. Progress UI Fade In
    tl.to(progressContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.6")

    // 4. Fake Load Generation (0 -> 100)
    const counterObj = { val: 0 }
    tl.to(counterObj, {
      val: 100,
      duration: 2.5, // 2.5s simulated loading curve
      ease: 'power2.inOut',
      onUpdate: () => {
        setPercent(Math.floor(counterObj.val))
        gsap.set(progressLineRef.current, { scaleX: counterObj.val / 100 })
      }
    })

    // 5. The Reveal
    // Progress UI exits
    tl.to(progressContainerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power3.in'
    }, "+=0.3") // Slight pause at 100%

    // Text expands and fades out
    tl.to(textContainerRef.current, {
      scale: 1.8,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.inOut'
    }, "-=0.3")

    // Background panels split radically
    tl.to(topRef.current, {
      yPercent: -100,
      duration: 1.4,
      ease: 'power4.inOut'
    }, "-=1.0")
    
    tl.to(bottomRef.current, {
      yPercent: 100,
      duration: 1.4,
      ease: 'power4.inOut'
    }, "-=1.4")

  }, [onComplete])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] pointer-events-auto flex flex-col justify-center items-center"
      // Setting pointer-events-auto blocks interaction with the page entirely until it lifts
    >
      {/* Background Splitting Panels */}
      <div ref={topRef} className="absolute top-0 left-0 w-full h-[50vh]" style={{ background: 'var(--ink)' }} />
      <div ref={bottomRef} className="absolute bottom-0 left-0 w-full h-[50vh]" style={{ background: 'var(--ink)' }} />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 'U N I T Y' Text */}
        <div 
          ref={textContainerRef} 
          className="flex gap-4 md:gap-8 origin-center"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}
        >
          {['U','N','I','T','Y'].map((letter, i) => (
            <span 
              key={i} 
              ref={(el) => { letterRefs.current[i] = el }}
              className="text-4xl md:text-6xl tracking-widest font-light"
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Loading Progress */}
        <div ref={progressContainerRef} className="mt-16 flex flex-col items-center gap-4 w-48 md:w-64">
           {/* Progress Line */}
           <div className="w-full h-[1px] bg-white/10 relative">
              <div ref={progressLineRef} className="absolute top-0 left-0 h-full w-full" style={{ background: 'var(--gold)' }} />
           </div>
           {/* Counter */}
           <div ref={counterRef} className="flex justify-between w-full text-xs tracking-[0.2em] font-sans" style={{ color: 'var(--gold)' }}>
              <span>LOADING</span>
              <span><span className="inline-block tabular-nums text-right" style={{ width: '2.5ch' }}>{percent}</span>%</span>
           </div>
        </div>
      </div>
    </div>
  )
}
