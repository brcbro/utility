'use client'
import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TOTAL_FRAMES = 168

function getFrameUrl(index: number) {
  const padded = String(index + 1).padStart(3, '0')
  return `/frames/ezgif-frame-${padded}.jpg`
}

interface Props {
  heroContent: ReactNode
  whoWeAreContent: ReactNode
}

export default function ScrollSequence({ heroContent, whoWeAreContent }: Props) {
  const outerRef = useRef<HTMLDivElement>(null!)
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const frameRef = useRef(0)
  const heroContentRef = useRef<HTMLDivElement>(null!)
  const whoRef = useRef<HTMLDivElement>(null!)
  const animTriggeredRef = useRef(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(frameRef.current)
    }

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index]
      if (!img?.complete || !img.naturalWidth) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h)
    }

    window.addEventListener('resize', resize)
    resize()

    // Load frames
    const images: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES }, () => new Image())
    imagesRef.current = images
    images[0].onload = () => drawFrame(0)
    images[0].src = getFrameUrl(0)
    for (let i = 1; i < TOTAL_FRAMES; i++) images[i].src = getFrameUrl(i)

    // Frame scrub — play all frames in the first 55% of the zone,
    // then hold on the last frame while who-we-are is visible
    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        // Clamp progress to 0–0.55 so last frame stays after that point
        const scrubProgress = Math.min(self.progress / 0.55, 1)
        const frame = Math.min(Math.floor(scrubProgress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)
        if (frame !== frameRef.current) {
          frameRef.current = frame
          drawFrame(frame)
        }

        // Fire card entrance animation precisely when the 143rd frame (index 142) appears
        if (!animTriggeredRef.current && frame >= 142) {
          animTriggeredRef.current = true
          window.dispatchEvent(new Event('who-we-are-enter'))
        }
      },
    })

    // Fade hero out in first 30%
    gsap.to(heroContentRef.current, {
      opacity: 0, y: -60, ease: 'none',
      scrollTrigger: {
        trigger: outerRef.current,
        start: 'top top',
        end: '30% top',
        scrub: true,
      },
    })

    // Fade who-we-are in just before frame 143 appears (frame 143 is at ~47% scroll progress)
    gsap.fromTo(whoRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, ease: 'none',
        scrollTrigger: {
          trigger: outerRef.current,
          start: '40% top',
          end: '47% top',
          scrub: true,
        },
      }
    )

    return () => {
      st.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div ref={outerRef} style={{ position: 'relative', height: '400vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />


        {/* Hero layer */}
        <div ref={heroContentRef} style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          {heroContent}
        </div>

        {/* WhoWeAre layer */}
        <div ref={whoRef} style={{ position: 'absolute', inset: 0, zIndex: 2, opacity: 0, overflow: 'hidden' }}>
          {whoWeAreContent}
        </div>
      </div>
    </div>
  )
}
