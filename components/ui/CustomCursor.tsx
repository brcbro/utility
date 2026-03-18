'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const dot = dotRef.current!

    // Using quickTo for smoother and more performant mouse tracking
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onEnter = () => {
      dot.classList.add('hovering')
    }
    const onLeave = () => {
      dot.classList.remove('hovering')
    }

    document.addEventListener('mousemove', onMove)
    
    // Mutation on hover
    const interactiveElements = document.querySelectorAll('a, button, .hoverable, input, textarea')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot" />
}
