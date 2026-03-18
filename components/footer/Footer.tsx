'use client'
import dynamic from 'next/dynamic'
import Magnetic from '@/components/ui/Magnetic'

const FooterGlobe = dynamic(() => import('./FooterGlobe'), { ssr: false })

const socials = [
  { label: 'IG', href: '#' },
  { label: 'LI', href: '#' },
  { label: 'TW', href: '#' },
  { label: 'YT', href: '#' },
]

export default function Footer() {
  return (
    <footer
      style={{ background: '#0C0A08', color: 'rgba(244,239,230,0.4)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Globe background */}
      <div
        className="globe-canvas"
        style={{ position: 'absolute', right: '-100px', top: '50%', transform: 'translateY(-50%)', width: 500, height: 500, opacity: 0.3, pointerEvents: 'none' }}
      >
        <FooterGlobe />
      </div>

      <div className="relative z-10 px-8 md:px-16 pt-20 pb-10">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16" style={{ borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
          <div className="md:col-span-1">
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 300,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--cream)',
                marginBottom: 16,
              }}
            >
              UNITY <span style={{ color: 'var(--gold)' }}>PARTNERS</span>
            </div>
            <p style={{ fontSize: '0.75rem', lineHeight: 1.9, maxWidth: 220 }}>
              Trusted leader in business support services since 2019 — dedicated to providing customized solutions for diverse business and career needs.
            </p>

            {/* Magnetic social icons */}
            <div className="flex gap-3 mt-8">
              {socials.map(s => (
                <Magnetic key={s.label} strength={0.5}>
                  <a
                    href={s.href}
                    className="hoverable w-9 h-9 border border-gold/20 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold transition-all duration-300"
                    style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.05em' }}
                  >
                    {s.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {[
            {
              title: 'Services',
              links: ['Business Setup', 'Immigration Services', 'Concierge Services', 'Citizenship by Investment'],
            },
            {
              title: 'Countries',
              links: ['Dubai Mainland', 'Abu Dhabi Mainland', 'ADGM', 'International'],
            },
            {
              title: 'Contact',
              links: ['Business Central Towers, Tower B', 'Office #2608, 26th Floor', 'Al Sufouh 2 - Dubai Media City', 'apply@unitypartners.ae'],
            },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none' }}>
                {col.links.map(link => (
                  <li key={link} style={{ marginBottom: 12 }}>
                    <a
                      href="#"
                      className="hoverable hover:text-cream transition-colors duration-200"
                      style={{ fontSize: '0.8rem', textDecoration: 'none', color: 'inherit' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span style={{ fontSize: '0.65rem' }}>© 2026 - Unity Partners. All Rights Reserved</span>
          <div className="flex gap-6" style={{ fontSize: '0.65rem' }}>
            {['Privacy Policy', 'Terms & Conditions', 'Terms of Use', 'Payment Policy', 'FAQ'].map(link => (
              <a key={link} href="#" className="hoverable hover:text-cream transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
