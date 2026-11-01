import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Cloud, Terminal, Coffee, MapPin, GitFork, Link, Mail } from 'lucide-react'
import { RoboChilling } from './CyberDroids'

gsap.registerPlugin(ScrollTrigger)

const FACTS = [
  { icon: Code2,    label: 'B.Tech CSE (CGPA: 8.11)', value: 'Lovely Professional University' },
  { icon: Terminal, label: 'Core Focus', value: 'Full Stack & DevOps' },
  { icon: Cloud,    label: 'Certifications', value: 'IIT Kharagpur (Cloud) & MongoDB' },
  { icon: Coffee,   label: 'Status', value: 'Open for Internships & Projects' },
]

const SOCIALS = [
  { icon: GitFork,  label: 'GitHub',    href: 'https://github.com/Aditya2274' },
  { icon: Link,     label: 'LinkedIn',  href: 'https://www.linkedin.com/in/aditya-ashok-singh-01b320282/' },
  { icon: Mail,     label: 'Email',     href: 'mailto:adityaashoksingh7@gmail.com' },
]

export default function About() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const bioRef     = useRef(null)
  const factsRef   = useRef(null)
  const imgRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, x: -40, duration: 0.7, ease: 'power3.out',
      })
      gsap.from(imgRef.current, {
        scrollTrigger: { trigger: imgRef.current, start: 'top 85%', once: true },
        opacity: 0, scale: 0.9, duration: 0.7, ease: 'power3.out',
      })
      gsap.from(bioRef.current?.children || [], {
        scrollTrigger: { trigger: bioRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.15,
      })
      gsap.from(factsRef.current?.children || [], {
        scrollTrigger: { trigger: factsRef.current, start: 'top 80%', once: true },
        opacity: 0, x: 30, duration: 0.5, ease: 'power2.out', stagger: 0.1,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div ref={headRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-tag mb-2">// 01 — INITIALIZE</p>
            <h2 className="section-title">About<span style={{ color: 'var(--neon-cyan)' }}>_Me</span></h2>
            <div className="section-line" />
          </div>
          <div className="self-start md:self-auto">
            <RoboChilling />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Avatar / Visual */}
          <div ref={imgRef} className="lg:col-span-4 flex flex-col items-center gap-6">
            <div className="cyber-card p-1.5 w-60 h-60 mx-auto relative group">
              <div
                className="w-full h-full overflow-hidden relative"
                style={{ background: 'var(--bg-deep)' }}
              >
                <img
                  src="/avatar.png"
                  alt="Aditya Ashok Singh"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    filter: 'contrast(1.05) brightness(1.02)',
                  }}
                />
                {/* Subtle cyber gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 70%, rgba(2, 4, 8, 0.75) 100%)',
                  }}
                />
              </div>

              {/* Corner status accent */}
              <div
                className="absolute -bottom-3 -right-3 font-mono text-xs px-2.5 py-1"
                style={{
                  background: 'var(--bg-void)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--neon-green)',
                  fontSize: '0.65rem',
                  boxShadow: '0 0 10px rgba(57, 255, 20, 0.3)',
                }}
              >
                SYS::ONLINE
              </div>

              {/* Top-left cyber badge */}
              <div
                className="absolute -top-3 -left-3 font-mono text-xs px-2 py-0.5"
                style={{
                  background: 'var(--bg-void)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--neon-cyan)',
                  fontSize: '0.6rem',
                }}
              >
                [ DEV // ARCHITECT ]
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
              <MapPin size={12} style={{ color: 'var(--neon-magenta)' }} />
              INDIA — AVAILABLE WORLDWIDE
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center cyber-card"
                  style={{ transition: 'all 0.2s' }}
                  title={label}
                >
                  <Icon size={16} style={{ color: 'var(--neon-cyan)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-4" ref={bioRef}>
            <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
              Hey — I'm <span style={{ color: 'var(--neon-cyan)' }}>Aditya Ashok Singh</span>, a Computer Science student at Lovely Professional University (CGPA: 8.11) with a deep interest in full-stack architecture and DevOps automation.
            </p>
            <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
              I build web platforms that <span style={{ color: 'var(--neon-magenta)' }}>scale cleanly and reliably</span> — whether it's full-stack surveillance apps, sandboxed code execution engines, or automated Git analysis pipelines with LLMs. My toolbelt includes Node.js, Express, React, MongoDB, PostgreSQL, Redis, Docker, and Jenkins.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I thrive on architecting clean REST APIs, enforcing type safety with Zod & Prisma, containerizing microservices, and setting up CI/CD automation. The goal: <span style={{ color: 'var(--neon-green)' }}>build robust, secure, and production-ready software</span>.
            </p>

            {/* Terminal-style info */}
            <div
              className="mt-8 p-4"
              style={{
                background: 'var(--bg-deep)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <p className="text-xs mb-3" style={{ color: 'var(--text-dim)' }}>$ whoami --verbose</p>
              {[
                ['name',   'Aditya Ashok Singh'],
                ['degree', 'B.Tech CSE (CGPA: 8.11) · LPU'],
                ['stack',  'React · Node · Express · Mongo · Postgres · Docker'],
                ['certs',  'Cloud Computing (IIT KGP) · MongoDB'],
                ['open',   'Backend / Full-Stack / DevOps Internships'],
              ].map(([key, val]) => (
                <p key={key} className="text-xs mb-1">
                  <span style={{ color: 'var(--neon-cyan)' }}>{key}</span>
                  <span style={{ color: 'var(--text-dim)' }}>=</span>
                  <span style={{ color: 'var(--text-primary)' }}> "{val}"</span>
                </p>
              ))}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="lg:col-span-4" ref={factsRef}>
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: 'var(--text-dim)' }}
            >
              // Quick_Facts
            </h3>
            <div className="space-y-3">
              {FACTS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="cyber-card p-4 flex items-center gap-4"
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ border: '1px solid var(--border-subtle)' }}
                  >
                    <Icon size={16} style={{ color: 'var(--neon-cyan)' }} />
                  </div>
                  <div>
                    <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>{label}</p>
                    <p className="font-body text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
