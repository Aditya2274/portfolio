import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const NAV_ITEMS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey',  href: '#timeline' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar({ scrollProgress }) {
  const [isOpen,    setIsOpen]    = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('')
  const mobileRef = useRef(null)
  const navRef    = useRef(null)

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileRef.current) return
    if (isOpen) {
      gsap.to(mobileRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', pointerEvents: 'auto' })
    } else {
      gsap.to(mobileRef.current, { opacity: 0, y: -20, duration: 0.25, ease: 'power2.in', pointerEvents: 'none' })
    }
  }, [isOpen])

  const scrollTo = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
    setActive(id)
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(2,4,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
          className="font-display font-black text-xl tracking-widest text-neon-cyan flicker no-select"
          style={{ textShadow: '0 0 10px var(--neon-cyan)' }}
        >
          &lt;<span style={{ color: 'var(--neon-magenta)' }}>A</span>DITYA<span style={{ color: 'var(--neon-magenta)' }}>_</span>&gt;
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => scrollTo(item.href)}
                className={`nav-link ${active === item.href.replace('#', '') ? 'active' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Resume Button */}
        <a
          href="/Aditya_Ashok_Singh_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Aditya_Ashok_Singh_Resume.pdf"
          className="hidden md:inline-block"
        >
          <button className="btn-cyber text-xs">
            <span>Download_CV</span>
          </button>
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: 'var(--neon-cyan)',
                transform: isOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(4px, -4px)'
                  : 'none',
                opacity: isOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-px"
        style={{
          width: scrollProgress + '%',
          background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
          boxShadow: '0 0 8px var(--neon-cyan)',
          transition: 'width 0.1s linear',
        }}
      />

      {/* Mobile Dropdown */}
      <div
        ref={mobileRef}
        className="fixed inset-0 md:hidden flex flex-col items-center justify-center"
        style={{
          background: 'rgba(2,4,8,0.97)',
          backdropFilter: 'blur(20px)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 40,
        }}
      >
        <ul className="flex flex-col items-center gap-10">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.label}>
              <button
                onClick={() => scrollTo(item.href)}
                className="font-display text-2xl text-neon-cyan tracking-widest uppercase hover:text-neon-magenta transition-colors"
                style={{ textShadow: '0 0 12px var(--neon-cyan)' }}
              >
                {String(i + 1).padStart(2, '0')}. {item.label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="/Aditya_Ashok_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Aditya_Ashok_Singh_Resume.pdf"
            >
              <button className="btn-cyber mt-4">
                <span>Download_CV</span>
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
