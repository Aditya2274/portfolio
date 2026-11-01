import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, GitFork, Layers, Terminal, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react'
import { RoboFlying } from './CyberDroids'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '001',
    title: 'ThoughtCare',
    subtitle: 'Mental Health Surveillance Platform',
    category: 'Full-Stack & Distributed Caching',
    period: 'Oct 2025 – Nov 2025',
    description:
      'Full-stack mental health surveillance system supporting 4 distinct user roles, Redis-backed sessions, relational consistency across MongoDB models, and automated 2-tier severity risk scoring.',
    highlights: [
      'Built a full-stack mental health surveillance platform supporting 4 user roles and 2 authentication methods using React, Node.js, Express, MongoDB, and Redis.',
      'Implemented Redis-backed sessions and role-based authorization (RBAC) to protect sensitive workflows and prevent unauthorized access.',
      'Designed MongoDB relationships across 6 core models and used reference population to maintain relational-style consistency in child, assessment, alert, chat, and case-note data.',
      'Engineered automated risk scoring that generated alerts for 2 severity tiers, enabling counsellor review, assignment, and resolution tracking.',
      'Deployed scalable backend services on Render with environment-based configuration management, and frontend on Vercel.',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Render', 'Vercel', 'RBAC'],
    accent: 'var(--neon-cyan)',
    icon: ShieldCheck,
    github: 'https://github.com/Aditya2274',
    live: null,
    status: 'DEPLOYED',
    lines: '14.2k',
  },
  {
    id: '002',
    title: 'AI-Powered Git Repository Analyzer',
    subtitle: 'Containerized DevOps Automation Tool',
    category: 'DevOps Automation & LLM Integration',
    period: 'Dec 2025 – Present',
    description:
      'Dockerized Git repository analysis platform that analyzes local and remote Git repositories, extracting commit statistics, contributor distribution, code churn, hotspot files, and stale branch insights.',
    highlights: [
      'Developed a Dockerized Git repository analysis platform analyzing local/remote repositories, extracting commit stats, contributor distribution, code churn, hotspot files, and stale branch insights.',
      'Built a parameterized Jenkins pipeline that dynamically clones remote Git repositories, executes the analyzer inside Docker, and archives generated reports and visualizations.',
      'Designed a modular AI reporting pipeline separating prompt construction, Groq LLM integration, report generation, and chart generation using Node.js and LangChain, with graceful static fallback.',
      'Automated Markdown report generation and repository visualizations for contributor distribution and daily commit activity using Node.js, Chart.js, and Bash.',
      'Implemented GitHub Actions CI/CD to build and publish versioned Docker images, validate latest image via automated analyzer execution, and upload generated reports as CI artifacts.',
    ],
    tech: ['Bash', 'Git CLI', 'Node.js', 'Chart.js', 'LangChain', 'Groq API', 'Docker', 'GitHub Actions', 'Jenkins'],
    accent: 'var(--neon-green)',
    icon: Terminal,
    github: 'https://github.com/Aditya2274',
    live: null,
    status: 'ACTIVE',
    lines: '9.8k',
  },
  {
    id: '003',
    title: 'AlgoVault',
    subtitle: 'Sandboxed Code Execution Platform',
    category: 'System Architecture & Sandboxed Compiler',
    period: 'Oct 2025 – Present',
    description:
      'Engineered a sandboxed code execution engine supporting JavaScript, TypeScript, and Python 3 with in-memory TypeScript transpilation, Zod 3-validated request pipelines, and containerized multi-tier stack.',
    highlights: [
      'Engineered a sandboxed code execution engine supporting JS, TS, and Python 3 with in-memory TypeScript transpilation via Compiler API, enforcing 3.5s timeout and 128 MB memory cap with per-test-case verdicts.',
      'Designed dynamic starter-code generator deriving JS, TS, and Python function templates purely from question titles and test-case input shapes with zero manual maintenance.',
      'Architected Zod 3-validated request pipelines across all API endpoints using reusable validateRequest middleware for body, query, and params, ensuring type-safe contracts end-to-end.',
      'Integrated Monaco Editor with per-language code save/restore, custom input runner, and zero-dependency hash-based router with filter/search state preservation on back-navigation.',
      'Containerized three-service stack (PostgreSQL 16, Express API, Nginx-served React) using multi-stage Dockerfiles and Docker Compose with health checks and non-root runtime security.',
    ],
    tech: ['TypeScript', 'Node.js', 'Express 5', 'PostgreSQL', 'Prisma ORM 7', 'Zod 3', 'React 19', 'Monaco Editor', 'Docker', 'Nginx'],
    accent: 'var(--neon-magenta)',
    icon: Cpu,
    github: 'https://github.com/Aditya2274',
    live: null,
    status: 'ACTIVE',
    lines: '11.5k',
  },
  {
    id: '004',
    title: 'QuizMaker Platform',
    subtitle: 'Real-Time Assessment & Auto-Evaluation Engine',
    category: 'Full-Stack Development (Summer Training)',
    period: 'Jun 2025 – Jul 2025',
    description:
      'Full-stack Quiz platform developed during Summer Training at Lovely Professional University, supporting role-based access for teachers/students and automated real-time grading for 100+ simulated users.',
    highlights: [
      'Built full-stack Quiz Maker platform supporting role-based authentication for 2+ user types (teachers and students).',
      'Created REST APIs handling real-time quiz submissions and auto-evaluation for 100+ simulated users.',
      'Reduced quiz evaluation time by approximately 80% through automated scoring logic.',
      'Enforced secure JWT-based authentication with protected routes.',
    ],
    tech: ['React', 'Node.js', 'Express', 'REST APIs', 'JWT Auth', 'MongoDB'],
    accent: 'var(--neon-violet)',
    icon: Layers,
    github: 'https://github.com/Aditya2274',
    live: null,
    status: 'COMPLETED',
    lines: '5.4k',
  },
]

const STATUS_COLORS = {
  DEPLOYED:    'var(--neon-cyan)',
  ACTIVE:      'var(--neon-green)',
  COMPLETED:   'var(--neon-violet)',
  PRODUCTION:  'var(--neon-green)',
  WIP:         'var(--neon-yellow)',
}

// 3D Interactive Tilt Card with Velocity-Triggered Flip
function TiltProjectCard({ proj }) {
  const cardRef = useRef(null)
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 })
  const flipTimerRef = useRef(null)

  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)

  const Icon = proj.icon

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current)
    }
  }, [])

  // Trigger high-speed flick 3D flip-over
  const triggerFlip = (dx, dy) => {
    if (isFlipping) return
    setIsFlipping(true)

    if (flipTimerRef.current) clearTimeout(flipTimerRef.current)

    // Determine swipe axis and direction
    const isHorizontal = Math.abs(dx) >= Math.abs(dy)
    const dir = isHorizontal
      ? (dx >= 0 ? 360 : -360)
      : (dy >= 0 ? -360 : 360)

    const flipStyle = isHorizontal
      ? `perspective(1000px) rotateY(${dir}deg) rotateX(0deg) scale3d(1.08, 1.08, 1.08) translateY(-14px)`
      : `perspective(1000px) rotateX(${dir}deg) rotateY(0deg) scale3d(1.08, 1.08, 1.08) translateY(-14px)`

    setTransform(flipStyle)
    setGlare({ x: 50, y: 50, opacity: 0.85 })

    // In ~1 second, smoothly land back into normal position
    flipTimerRef.current = setTimeout(() => {
      restoreNormal(false)
    }, 950)
  }

  // Restore card back to normal state
  const restoreNormal = (instant = false) => {
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current)
    setIsFlipping(false)

    if (cardRef.current) {
      if (instant) {
        cardRef.current.style.transition = 'none'
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)')
        void cardRef.current.offsetHeight
        cardRef.current.style.transition = 'transform 0.1s ease-out, border-color 0.25s ease, box-shadow 0.25s ease'
      } else {
        cardRef.current.style.transition = 'none'
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)')
        void cardRef.current.offsetHeight
        cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease'
      }
    } else {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)')
    }
    setGlare(prev => ({ ...prev, opacity: 0 }))
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const now = performance.now()
    const last = lastMouseRef.current
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // If card was in flipping state and cursor returns / moves on it, return immediately to normal
    if (isFlipping) {
      restoreNormal(true)
    }

    const dt = now - last.time
    if (dt > 8 && dt < 120 && !isFlipping) {
      const dx = x - last.x
      const dy = y - last.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const velocity = dist / dt // pixels per ms

      // If user moves cursor fast enough (> 2.0 px/ms with travel > 30px), trigger flip-over!
      if (velocity > 2.0 && dist > 30) {
        lastMouseRef.current = { x, y, time: now }
        triggerFlip(dx, dy)
        return
      }
    }

    lastMouseRef.current = { x, y, time: now }

    // Normal 3D tilt tracking
    const normX = ((x / rect.width) * 2) - 1
    const normY = ((y / rect.height) * 2) - 1

    const maxTilt = 11
    const rotateX = (-normY * maxTilt).toFixed(2)
    const rotateY = (normX * maxTilt).toFixed(2)

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025) translateY(-5px)`)

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100
    setGlare({ x: glareX, y: glareY, opacity: 1 })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    // If the card was flipped or flipping when cursor returns, instantly restore normal state
    if (isFlipping) {
      restoreNormal(true)
    }
  }

  const handleMouseLeave = (e) => {
    setIsHovered(false)
    const now = performance.now()
    const last = lastMouseRef.current
    const dt = now - last.time

    // Check if cursor flicked fast off the edge of the card
    if (dt > 0 && dt < 100 && !isFlipping && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const dx = x - last.x
      const dy = y - last.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const velocity = dist / dt

      if (velocity > 1.8 && dist > 25) {
        triggerFlip(dx, dy)
        return
      }
    }

    if (!isFlipping) {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)')
      setGlare(prev => ({ ...prev, opacity: 0 }))
    }
  }

  return (
    <div
      className="project-card h-full"
      style={{
        perspective: '1000px',
        opacity: 1,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cyber-card group cursor-pointer flex flex-col justify-between h-full relative"
        style={{
          transform,
          transition: isFlipping
            ? 'transform 0.85s cubic-bezier(0.18, 0.89, 0.32, 1.15), border-color 0.35s ease, box-shadow 0.35s ease'
            : isHovered
            ? 'transform 0.08s ease-out, border-color 0.25s ease, box-shadow 0.25s ease'
            : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          borderColor: isFlipping
            ? proj.accent
            : isHovered
            ? proj.accent + '80'
            : 'var(--border-subtle)',
          boxShadow: isFlipping
            ? `0 0 50px ${proj.accent}50, 0 0 90px ${proj.accent}25`
            : isHovered
            ? `0 15px 40px ${proj.accent}25, 0 0 60px ${proj.accent}15`
            : 'none',
        }}
      >
        {/* Holographic Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 380px at ${glare.x}% ${glare.y}%, ${proj.accent}25, transparent 75%)`,
            opacity: glare.opacity,
            zIndex: 15,
          }}
        />

        {/* Top accent line */}
        <div
          className="h-px w-0 group-hover:w-full transition-all duration-500"
          style={{ background: proj.accent, boxShadow: `0 0 10px ${proj.accent}` }}
        />

        <div
          className="p-6 md:p-7 flex-1 flex flex-col justify-between relative z-10"
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
        >
          <div>
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    border: `1px solid ${proj.accent}45`,
                    background: proj.accent + '15',
                    boxShadow: isHovered || isFlipping ? `0 0 15px ${proj.accent}40` : 'none',
                  }}
                >
                  <Icon size={20} style={{ color: proj.accent }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[11px] block"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      PROJECT_{proj.id}
                    </span>
                    <span
                      className="font-mono text-[10px] px-1.5 py-0.2 rounded"
                      style={{
                        background: proj.accent + '15',
                        color: proj.accent,
                        border: `1px solid ${proj.accent}30`,
                      }}
                    >
                      {proj.category}
                    </span>
                  </div>
                  <h3
                    className="font-display text-base md:text-lg font-bold uppercase tracking-wider mt-0.5"
                    style={{ color: proj.accent, textShadow: isHovered || isFlipping ? `0 0 12px ${proj.accent}` : 'none' }}
                  >
                    {proj.title}
                  </h3>
                </div>
              </div>

              {/* Status badge */}
              <span
                className="font-mono text-xs px-2.5 py-0.5 flex-shrink-0 font-medium"
                style={{
                  border: `1px solid ${STATUS_COLORS[proj.status]}50`,
                  color: STATUS_COLORS[proj.status],
                  background: STATUS_COLORS[proj.status] + '15',
                }}
              >
                {proj.status}
              </span>
            </div>

            {/* Subtitle & Date Period */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <p
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: 'var(--text-secondary)' }}
              >
                {proj.subtitle}
              </p>
              {proj.period && (
                <span className="font-mono text-xs px-2 py-0.5" style={{ color: 'var(--neon-cyan)', background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)' }}>
                  {proj.period}
                </span>
              )}
            </div>

            {/* Summary Description */}
            <p
              className="font-body text-sm leading-relaxed mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {proj.description}
            </p>

            {/* Core Engineering Highlights Box */}
            {proj.highlights && (
              <div
                className="mb-5 p-4 rounded-sm"
                style={{
                  background: 'rgba(5, 12, 24, 0.8)',
                  border: `1px solid ${isHovered || isFlipping ? proj.accent + '40' : 'var(--border-subtle)'}`,
                  transition: 'border-color 0.3s ease',
                  transform: 'translateZ(10px)',
                }}
              >
                <p className="font-mono text-[11px] uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: proj.accent }}>
                  <CheckCircle2 size={13} />
                  <span>Key Architecture & Features:</span>
                </p>
                <ul className="space-y-2">
                  {proj.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-body leading-relaxed">
                      <span style={{ color: proj.accent }} className="flex-shrink-0 font-mono text-sm leading-none mt-0.5">▹</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom section: Tags & Links */}
          <div style={{ transform: 'translateZ(15px)' }}>
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2 py-0.5"
                  style={{
                    border: `1px solid ${proj.accent}30`,
                    color: proj.accent,
                    background: proj.accent + '0a',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                ~{proj.lines} lines of code
              </span>
              <div className="flex items-center gap-4">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 transition-all hover:text-neon-cyan"
                    style={{
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      background: 'var(--bg-deep)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GitFork size={12} style={{ color: proj.accent }} /> Source_Code
                  </a>
                )}
                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 transition-all hover:text-neon-cyan"
                    style={{
                      border: `1px solid ${proj.accent}40`,
                      color: proj.accent,
                      background: proj.accent + '15',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={12} /> Live_Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.fromTo(
          headRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: headRef.current, start: 'top 90%', once: true },
            clearProps: 'opacity,transform',
          }
        )
      }

      // Card entrance animation
      const cards = sectionRef.current?.querySelectorAll('.project-card')
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 92%', once: true },
            clearProps: 'opacity,transform',
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-tag mb-2">// 03 — PROJECTS</p>
            <h2 className="section-title">Selected<span style={{ color: 'var(--neon-cyan)' }}>_Work</span></h2>
            <p className="font-mono text-xs mt-2" style={{ color: 'var(--text-dim)' }}>
              // Featured Core Systems & Architectures (3D Interactive Tilt)
            </p>
            <div className="section-line" />
          </div>
          <div className="self-start md:self-auto">
            <RoboFlying />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {PROJECTS.map((proj) => (
            <TiltProjectCard key={proj.id} proj={proj} />
          ))}
        </div>

        {/* View More */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Aditya2274"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-cyber-outline">
              <span className="flex items-center gap-2">
                <GitFork size={14} /> View_All_Repos_On_GitHub
              </span>
            </button>
          </a>
        </div>

      </div>
    </section>
  )
}
