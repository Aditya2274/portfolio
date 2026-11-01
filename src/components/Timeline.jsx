import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, GraduationCap, Award, BookOpen, Terminal, Cpu, ShieldCheck } from 'lucide-react'
import { RoboFighting } from './CyberDroids'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE = [
  {
    year: 'Dec 2025 — Present',
    type: 'PROJECT',
    icon: Terminal,
    title: 'AI-Powered Git Repository Analyzer',
    org: 'DevOps & AI Tooling | Containerized Automation',
    desc: 'Developed a Dockerized Git repository analysis platform with parameterized Jenkins pipelines, LangChain + Groq LLM integration, automated visual reporting, and GitHub Actions CI/CD publishing versioned Docker images.',
    accent: 'var(--neon-green)',
    tags: ['Docker', 'Jenkins', 'LangChain', 'Groq API', 'GitHub Actions', 'CI/CD'],
  },
  {
    year: 'Oct 2025 — Present',
    type: 'PROJECT',
    icon: Cpu,
    title: 'AlgoVault — Sandboxed Execution Platform',
    org: 'System Architecture | Full-Stack Engineering',
    desc: 'Engineered a sandboxed code execution engine supporting JS, TS, and Python 3 with in-memory TypeScript transpilation (3.5s timeout, 128 MB cap), Zod 3-validated APIs, Monaco Editor, and a 3-service Docker Compose architecture.',
    accent: 'var(--neon-magenta)',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'Docker Compose', 'Monaco'],
  },
  {
    year: 'Oct 2025 — Nov 2025',
    type: 'PROJECT',
    icon: ShieldCheck,
    title: 'ThoughtCare — Mental Health Surveillance Platform',
    org: 'Full-Stack Platform | Distributed Caching',
    desc: 'Built a full-stack mental health surveillance platform supporting 4 user roles, Redis-backed sessions, MongoDB relationships across 6 core models with reference population, automated 2-tier severity risk scoring, deployed on Render & Vercel.',
    accent: 'var(--neon-cyan)',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Render', 'Vercel', 'RBAC'],
  },
  {
    year: 'Oct 2025',
    type: 'CERTIFICATION',
    icon: Award,
    title: 'Cloud Computing Certification',
    org: 'IIT Kharagpur (NPTEL)',
    desc: 'Completed an intensive 8-week NPTEL course by IIT Kharagpur covering distributed virtualization, cloud service architectures, storage models, and cloud security frameworks.',
    accent: 'var(--neon-yellow)',
    tags: ['NPTEL', 'IIT Kharagpur', 'Cloud Computing', 'Virtualization'],
  },
  {
    year: 'Jun 2025 — Jul 2025',
    type: 'TRAINING',
    icon: Briefcase,
    title: 'Summer Training — Full Stack Development in React & Node',
    org: 'Lovely Professional University',
    desc: 'Engineered a full-stack Quiz Maker platform supporting role-based authentication for 2+ user types (teachers and students). Built REST APIs handling real-time quiz submissions and auto-evaluation for 100+ simulated users, reducing evaluation time by ~80% with JWT-protected routes.',
    accent: 'var(--neon-violet)',
    tags: ['React', 'Node.js', 'Express', 'JWT Auth', 'REST APIs', 'Auto-Scoring'],
  },
  {
    year: 'Jun 2025',
    type: 'CERTIFICATION',
    icon: Award,
    title: 'Introduction to MongoDB Certification',
    org: 'MongoDB University',
    desc: 'Certified in MongoDB database architecture, document data modeling, indexing strategies, aggregation pipelines, and schema design.',
    accent: 'var(--neon-cyan)',
    tags: ['MongoDB', 'NoSQL', 'Document Modeling', 'Aggregation'],
  },
  {
    year: 'Aug 2023 — Present',
    type: 'EDUCATION',
    icon: GraduationCap,
    title: 'B.Tech in Computer Science & Engineering',
    org: 'Lovely Professional University | Phagwara, Punjab',
    desc: 'Pursuing B.Tech in CSE with a current CGPA of 8.11. Specializing in full-stack web platforms, data structures & algorithms, database systems, and modern containerized DevOps pipelines.',
    accent: 'var(--neon-green)',
    tags: ['B.Tech CSE', 'CGPA: 8.11', 'LPU', 'Full Stack', 'DevOps'],
  },
  {
    year: 'Jul 2020 — May 2022',
    type: 'EDUCATION',
    icon: BookOpen,
    title: 'Senior Secondary / Intermediate (82%)',
    org: 'St. Basil’s School | Khirighati, Uttar Pradesh',
    desc: 'Completed Higher Secondary schooling with 82% aggregate, building strong analytical fundamentals in Science and Mathematics.',
    accent: 'var(--neon-yellow)',
    tags: ['Class XII', '82%', 'PCM'],
  },
  {
    year: 'Apr 2018 — Mar 2020',
    type: 'EDUCATION',
    icon: BookOpen,
    title: 'Secondary School / Matriculation (90.6%)',
    org: 'St. Basil’s School | Khirighati, Uttar Pradesh',
    desc: 'Graduated matriculation with distinction (90.6%), establishing core academic and logical problem-solving foundations.',
    accent: 'var(--neon-cyan)',
    tags: ['Class X', '90.6%', 'Distinction'],
  },
]

export default function Timeline() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const lineRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.fromTo(
          headRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
            clearProps: 'opacity,transform',
          }
        )
      }

      // Animate vertical line
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'bottom 20%', scrub: 1 },
          scaleY: 0,
          transformOrigin: 'top',
          ease: 'none',
        })
      }

      // Timeline items animation with individual triggers and clearProps
      const items = sectionRef.current?.querySelectorAll('.timeline-card-item')
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 90%', once: true },
            clearProps: 'opacity,transform',
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" ref={sectionRef} className="py-28 px-6 relative z-10">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: 'linear-gradient(180deg, transparent, var(--bg-surface) 50%, transparent)' }}
      />
      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div ref={headRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-tag mb-2">// 04 — JOURNEY</p>
            <h2 className="section-title">Git<span style={{ color: 'var(--neon-cyan)' }}>_Log</span></h2>
            <p className="font-mono text-xs mt-2" style={{ color: 'var(--text-dim)' }}>
              // Chronological record (Latest &rarr; Oldest)
            </p>
            <div className="section-line" />
          </div>
          <div className="self-start md:self-auto">
            <RoboFighting />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, var(--neon-cyan), var(--neon-magenta), var(--neon-violet), var(--neon-green), var(--neon-yellow))',
              opacity: 0.35,
            }}
          />

          <div className="space-y-16">
            {TIMELINE.map((item, idx) => {
              const Icon = item.icon
              const isLeft = idx % 2 === 0

              return (
                <div
                  key={idx}
                  className={`timeline-card-item relative md:flex md:items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ opacity: 1 }}
                >
                  {/* Card */}
                  <div className="md:w-1/2">
                    <div
                      className="cyber-card p-6 group"
                      style={{
                        borderColor: item.accent + '25',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = item.accent + '60'
                        e.currentTarget.style.boxShadow = `0 0 30px ${item.accent}25`
                        e.currentTarget.style.transform = 'translateY(-4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = item.accent + '25'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      {/* Top row: Year & Category Badge */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span
                          className="font-mono text-xs px-2.5 py-0.5"
                          style={{
                            border: `1px solid ${item.accent}50`,
                            color: item.accent,
                            background: item.accent + '15',
                            fontWeight: 600,
                          }}
                        >
                          {item.year}
                        </span>
                        <span
                          className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5"
                          style={{
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-dim)',
                          }}
                        >
                          {item.type}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            border: `1px solid ${item.accent}40`,
                            background: item.accent + '10',
                          }}
                        >
                          <Icon size={16} style={{ color: item.accent }} />
                        </div>
                        <div>
                          <h3
                            className="font-display text-sm font-bold uppercase tracking-wider"
                            style={{ color: item.accent }}
                          >
                            {item.title}
                          </h3>
                          <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
                            {item.org}
                          </p>
                        </div>
                      </div>

                      <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {item.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs px-2 py-0.5"
                            style={{
                              border: `1px solid ${item.accent}25`,
                              color: item.accent,
                              background: item.accent + '0a',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Node on the vertical line */}
                  <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
                      style={{
                        background: 'var(--bg-void)',
                        border: `2px solid ${item.accent}`,
                        boxShadow: `0 0 10px ${item.accent}`,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: item.accent }}
                      />
                    </div>
                  </div>

                  {/* Spacer on the opposite side */}
                  <div className="md:w-1/2" />
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
