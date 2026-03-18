'use client'
import { useEffect, useRef, useState } from 'react'
import Magnetic from '@/components/ui/Magnetic'

const links = ['About Us', 'Business Setup', 'Countries', 'Support']

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          setScrolled(currentY > 60)
          if (currentY > lastScrollY.current && currentY > 80) {
            setVisible(false)
          } else {
            setVisible(true)
          }
          lastScrollY.current = currentY
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Fixed outer wrapper — centres the pill */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 24px',
          pointerEvents: 'none',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: visible ? 'translateY(0)' : 'translateY(-110%)',
        }}
      >
        {/* Pill nav */}
        <nav
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: 900,
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 18px 10px 24px',
            transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
            background: scrolled
              ? 'rgba(16, 14, 10, 0.6)'
              : 'rgba(16, 14, 10, 0.35)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: scrolled
              ? '1px solid rgba(59, 130, 246, 0.2)'
              : '1px solid rgba(59, 130, 246, 0.08)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(59,130,246,0.1)'
              : '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(59,130,246,0.06)',
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 300,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--cream)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            UNITY <span style={{ color: 'var(--gold)' }}>PARTNERS</span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8 list-none m-0 p-0">
            {links.map(link => (
              <li key={link}>
                <a
                  href="#"
                  className="hoverable"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(244, 239, 230, 0.85)',
                    textDecoration: 'none',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244, 239, 230, 0.85)')}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA pill button */}
          <div className="hidden md:block">
            <Magnetic>
              <button
                className="hoverable"
                style={{
                  padding: '9px 22px',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  border: '1px solid rgba(59, 130, 246, 0.45)',
                  background: 'rgba(59, 130, 246, 0.07)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  borderRadius: 999,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  const btn = e.currentTarget as HTMLButtonElement
                  btn.style.background = 'var(--gold)'
                  btn.style.color = '#fff'
                  btn.style.borderColor = 'var(--gold)'
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget as HTMLButtonElement
                  btn.style.background = 'rgba(59, 130, 246, 0.1)'
                  btn.style.color = 'var(--gold)'
                  btn.style.borderColor = 'rgba(59, 130, 246, 0.45)'
                }}
              >
                Apply Now
              </button>
            </Magnetic>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-1"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            style={{ outline: 'none' }}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 20,
                  height: 1.5,
                  background: 'var(--cream)',
                  transition: 'all 0.3s',
                  transformOrigin: 'center',
                  transform:
                    menuOpen && i === 0
                      ? 'translateY(4.5px) rotate(45deg)'
                      : menuOpen && i === 1
                      ? 'scaleX(0)'
                      : menuOpen && i === 2
                      ? 'translateY(-4.5px) rotate(-45deg)'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </div>

      {/* Mobile dropdown — separate from pill, full-width */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: visible ? 'translateY(0)' : 'translateY(-110%)',
        }}
        className="md:hidden"
      >
        <div
          style={{
            overflow: 'hidden',
            maxHeight: menuOpen ? '300px' : '0',
            transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'rgba(14, 12, 10, 0.95)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(59,130,246,0.12)',
            paddingTop: menuOpen ? 84 : 0,
          }}
        >
          <ul className="list-none m-0 py-6 px-8 flex flex-col gap-5">
            {links.map(link => (
              <li key={link}>
                <a
                  href="#"
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(244,239,230,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,239,230,0.7)')}
                >
                  {link}
                </a>
              </li>
            ))}
            <li>
              <button
                style={{
                  marginTop: 8,
                  padding: '10px 24px',
                  borderRadius: 999,
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  border: '1px solid rgba(59,130,246,0.4)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Apply Now
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
