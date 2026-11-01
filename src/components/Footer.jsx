import React from 'react'
import { GitFork, Link, Mail, ArrowUp } from 'lucide-react'

const LINKS = [
  { href: 'https://github.com/Aditya2274',                 icon: GitFork, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/aditya-ashok-singh-01b320282/', icon: Link,    label: 'LinkedIn' },
  { href: 'mailto:adityaashoksingh7@gmail.com',            icon: Mail,    label: 'Email' },
]

const NAV_LINKS = [
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#timeline', label: 'Journey' },
  { href: '#contact',  label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 py-12 px-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div
              className="font-display font-black text-xl tracking-widest mb-3 flicker"
              style={{ color: 'var(--neon-cyan)', textShadow: '0 0 10px var(--neon-cyan)' }}
            >
              &lt;<span style={{ color: 'var(--neon-magenta)' }}>A</span>DITYA_ASHOK_&gt;
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              Full Stack & DevOps Engineer.<br />
              Building scalable systems with React, Node & Docker.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-dim)' }}>
              // Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-mono text-xs uppercase tracking-wider transition-colors duration-200 hover:text-neon-cyan"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact quick */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-dim)' }}>
              // Socials
            </h4>
            <div className="flex gap-3">
              {LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center cyber-card transition-all duration-200"
                  style={{ transition: 'all 0.2s' }}
                  title={label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--neon-cyan)'
                    e.currentTarget.style.boxShadow = 'var(--glow-cyan)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <Icon size={15} style={{ color: 'var(--neon-cyan)' }} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="neon-divider mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            © {year} ADITYA ASHOK SINGH — BUILT WITH{' '}
            <span style={{ color: 'var(--neon-cyan)' }}>REACT</span> +{' '}
            <span style={{ color: 'var(--neon-magenta)' }}>GSAP</span> +{' '}
            <span style={{ color: 'var(--neon-violet)' }}>SPLINE</span>
          </p>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:text-neon-cyan group"
            style={{ color: 'var(--text-dim)' }}
          >
            Back_to_Top
            <div
              className="w-6 h-6 flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1"
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              <ArrowUp size={10} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  )
}
