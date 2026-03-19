'use client'
import { useEffect, useRef, useState } from 'react'
import Magnetic from '@/components/ui/Magnetic'

const links = [
  { name: 'About Us', href: '#about-us' },
  { name: 'Business Setup', href: '#business-setup' },
  { name: 'Countries', href: '#countries' },
  { name: 'Support', href: '#support' }
]

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
              <li key={link.name}>
                <a
                  href={link.href}
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
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA pill button */}
          <div className="hidden md:block">
            <Magnetic>
              <button
                className="hoverable"
                onClick={() => {
                  document.querySelector('#support')?.scrollIntoView({ behavior: 'smooth' });
                }}
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
            className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-2"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            style={{ outline: 'none', position: 'relative', zIndex: 101 }}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 24,
                  height: 2,
                  background: 'var(--cream)',
                  borderRadius: 1,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformOrigin: 'center',
                  transform:
                    menuOpen && i === 0
                      ? 'translateY(8px) rotate(45deg)'
                      : menuOpen && i === 1
                      ? 'scaleX(0)'
                      : menuOpen && i === 2
                      ? 'translateY(-8px) rotate(-45deg)'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </div>

      {/* Mobile dropdown — Fullscreen overlay for better feel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          background: 'rgba(14, 12, 10, 0.98)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-10%)',
        }}
        className="md:hidden"
      >
        <ul className="list-none m-0 p-0 flex flex-col items-center gap-10">
          {links.map((link, i) => (
            <li 
              key={link.name}
              style={{
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: menuOpen ? `${i * 0.1}s` : '0s',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <a
                href={link.href}
                style={{
                  fontSize: '1.2rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--cream)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  transition: 'color 0.3s',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li
            style={{
              marginTop: 20,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: menuOpen ? `${links.length * 0.1}s` : '0s',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                document.querySelector('#support')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '16px 40px',
                borderRadius: 999,
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#fff',
                border: '1px solid var(--gold)',
                background: 'var(--gold)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                boxShadow: '0 10px 30px rgba(184, 154, 88, 0.3)',
              }}
            >
              Apply Now
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
