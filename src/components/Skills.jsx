import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RoboPartying } from './CyberDroids'

gsap.registerPlugin(ScrollTrigger)

const SKILL_CATEGORIES = [
  {
    tag: 'LANG',
    title: 'Languages',
    accent: 'var(--neon-cyan)',
    skills: [
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'TypeScript',        level: 80 },
      { name: 'Java',              level: 82 },
      { name: 'Python',            level: 75 },
      { name: 'Bash / Shell',      level: 78 },
    ],
  },
  {
    tag: 'BE & DB',
    title: 'Backend & Databases',
    accent: 'var(--neon-magenta)',
    skills: [
      { name: 'Node.js & Express', level: 90 },
      { name: 'MongoDB & Mongoose',level: 85 },
      { name: 'PostgreSQL & Prisma',level: 80 },
      { name: 'Redis (Caching/Auth)',level: 78 },
      { name: 'REST APIs & Zod',   level: 88 },
    ],
  },
  {
    tag: 'FE',
    title: 'Frontend Architecture',
    accent: 'var(--neon-violet)',
    skills: [
      { name: 'React (18/19)',     level: 88 },
      { name: 'Tailwind CSS',      level: 85 },
      { name: 'HTML5 & CSS3',      level: 90 },
      { name: 'Vite & Monaco Ed.', level: 80 },
      { name: 'State & UI Routing',level: 82 },
    ],
  },
  {
    tag: 'OPS',
    title: 'DevOps, Cloud & Automation',
    accent: 'var(--neon-green)',
    skills: [
      { name: 'Docker & Compose',  level: 85 },
      { name: 'GitHub Actions CI', level: 82 },
      { name: 'Jenkins Pipelines', level: 75 },
      { name: 'Linux Administration', level: 80 },
      { name: 'AWS & Cloud (IIT)', level: 70 },
    ],
  },
]

const TOOLS = [
  'Docker', 'Docker Compose', 'Jenkins', 'GitHub Actions', 'Git CLI',
  'Postman', 'Linux / Bash', 'MongoDB Atlas', 'PostgreSQL', 'Redis',
  'Prisma ORM', 'Zod', 'Monaco Editor', 'LangChain', 'Groq API',
  'Chart.js', 'Nginx', 'Render', 'Vercel', 'AWS', 'Terraform', 'Ansible'
]

function SkillBar({ name, level, accent, index }) {
  const barRef = useRef(null)

  useEffect(() => {
    if (!barRef.current) return
    const fill = barRef.current.querySelector('.bar-fill')
    gsap.from(fill, {
      scrollTrigger: { trigger: barRef.current, start: 'top 90%', once: true },
      scaleX: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power2.out',
      transformOrigin: 'left',
    })
  }, [index])

  return (
    <div ref={barRef} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          {name}
        </span>
        <span className="font-mono text-xs" style={{ color: accent }}>
          {level}%
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="bar-fill progress-bar-fill"
          style={{
            width: level + '%',
            background: `linear-gradient(90deg, ${accent}, var(--neon-cyan))`,
            boxShadow: `0 0 8px ${accent}80`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const gridRef    = useRef(null)
  const toolsRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, x: -40, duration: 0.7, ease: 'power3.out',
      })
      gsap.from(gridRef.current?.querySelectorAll('.skill-cat') || [], {
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 40, duration: 0.6, ease: 'power2.out', stagger: 0.15,
      })
      gsap.from(toolsRef.current?.querySelectorAll('span') || [], {
        scrollTrigger: { trigger: toolsRef.current, start: 'top 85%', once: true },
        opacity: 0, scale: 0.8, duration: 0.4, ease: 'back.out(1.5)', stagger: 0.05,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-28 px-6 relative z-10">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'linear-gradient(180deg, transparent, var(--bg-deep) 50%, transparent)' }}
      />
      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div ref={headRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-tag mb-2">// 02 — TECH_STACK</p>
            <h2 className="section-title">Skills<span style={{ color: 'var(--neon-cyan)' }}>_Matrix</span></h2>
            <div className="section-line" />
          </div>
          <div className="self-start md:self-auto">
            <RoboPartying />
          </div>
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-8 mb-16">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="skill-cat cyber-card p-6 space-y-5"
              style={{ '--card-accent': cat.accent }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span
                  className="font-mono text-xs px-2 py-0.5"
                  style={{
                    background: cat.accent + '18',
                    border: `1px solid ${cat.accent}40`,
                    color: cat.accent,
                  }}
                >
                  {cat.tag}
                </span>
                <h3 className="font-display text-sm uppercase tracking-widest" style={{ color: cat.accent }}>
                  {cat.title}
                </h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {cat.skills.map((s, i) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} accent={cat.accent} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools & Extras */}
        <div ref={toolsRef} className="cyber-card p-6">
          <h3
            className="font-mono text-xs uppercase tracking-widest mb-6"
            style={{ color: 'var(--text-dim)' }}
          >
            // Tools & Environment
          </h3>
          <div className="flex flex-wrap gap-3">
            {TOOLS.map((tool) => (
              <span key={tool} className="skill-tag">
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
