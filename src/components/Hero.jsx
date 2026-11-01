import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Terminal, ChevronDown, Mail, ArrowRight } from 'lucide-react'

const TYPING_STRINGS = [
  '> Full Stack Developer_',
  '> Backend & Systems Architect_',
  '> DevOps & Containerization Enthusiast_',
  '> React & Node.js Engineer_',
]

// 3D Rotating Cube rendered purely with CSS/JS on canvas
function HoloCube() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width  = 280
    const H = canvas.height = 280
    const cx = W / 2, cy = H / 2
    let animId
    let angle = 0

    const CYAN    = '#00f5ff'
    const MAGENTA = '#ff006e'
    const VIOLET  = '#bf5fff'

    function project(x, y, z) {
      const fov = 300
      const s = fov / (fov + z + 100)
      return { x: cx + x * s, y: cy + y * s }
    }

    function rotateY(x, y, z, a) {
      return { x: x * Math.cos(a) - z * Math.sin(a), y, z: x * Math.sin(a) + z * Math.cos(a) }
    }
    function rotateX(x, y, z, a) {
      return { x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) }
    }

    const SIZE = 70

    function drawEdge(p1, p2, color, alpha) {
      const a1 = project(p1.x, p1.y, p1.z)
      const a2 = project(p2.x, p2.y, p2.z)
      ctx.beginPath()
      ctx.moveTo(a1.x, a1.y)
      ctx.lineTo(a2.x, a2.y)
      ctx.strokeStyle = color
      ctx.globalAlpha = alpha
      ctx.lineWidth = 1.5
      ctx.shadowColor = color
      ctx.shadowBlur = 8
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    }

    function frame() {
      ctx.clearRect(0, 0, W, H)
      angle += 0.008

      const verts = [
        [-SIZE, -SIZE, -SIZE], [ SIZE, -SIZE, -SIZE],
        [ SIZE,  SIZE, -SIZE], [-SIZE,  SIZE, -SIZE],
        [-SIZE, -SIZE,  SIZE], [ SIZE, -SIZE,  SIZE],
        [ SIZE,  SIZE,  SIZE], [-SIZE,  SIZE,  SIZE],
      ].map(([x, y, z]) => {
        let r = rotateY(x, y, z, angle)
        r = rotateX(r.x, r.y, r.z, angle * 0.4)
        return r
      })

      const edges = [
        [0,1],[1,2],[2,3],[3,0], // back face
        [4,5],[5,6],[6,7],[7,4], // front face
        [0,4],[1,5],[2,6],[3,7], // connectors
      ]

      const colors = [CYAN, CYAN, CYAN, CYAN, MAGENTA, MAGENTA, MAGENTA, MAGENTA, VIOLET, VIOLET, VIOLET, VIOLET]
      edges.forEach(([a, b], i) => {
        drawEdge(verts[a], verts[b], colors[i], 0.7)
      })

      // Draw corner dots
      verts.forEach((v) => {
        const p = project(v.x, v.y, v.z)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = CYAN
        ctx.globalAlpha = 0.9
        ctx.shadowColor = CYAN
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      })

      animId = requestAnimationFrame(frame)
    }

    frame()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          border: '1px solid var(--neon-cyan)',
          animation: 'spin 8s linear infinite',
        }}
      />
      <canvas ref={canvasRef} style={{ imageRendering: 'crisp-edges' }} />
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: '2px solid var(--neon-cyan)', borderLeft: '2px solid var(--neon-cyan)' }} />
      <div className="absolute top-0 right-0 w-6 h-6" style={{ borderTop: '2px solid var(--neon-magenta)', borderRight: '2px solid var(--neon-magenta)' }} />
      <div className="absolute bottom-0 left-0 w-6 h-6" style={{ borderBottom: '2px solid var(--neon-magenta)', borderLeft: '2px solid var(--neon-magenta)' }} />
      <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: '2px solid var(--neon-cyan)', borderRight: '2px solid var(--neon-cyan)' }} />
    </div>
  )
}

export default function Hero() {
  const [text, setText]         = useState('')
  const [strIdx, setStrIdx]     = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)

  const tagRef     = useRef(null)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef    = useRef(null)
  const ctaRef     = useRef(null)
  const statsRef   = useRef(null)
  const sideRef    = useRef(null)
  const cornerRef  = useRef(null)
  const scrollRef  = useRef(null)
  const cubeRef    = useRef(null)

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.8 }) // Wait for loading screen
    tl.fromTo(sideRef.current,    { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.5, ease: 'power2.out', transformOrigin: 'top' })
      .fromTo(tagRef.current,     { opacity: 0, x: -30 },    { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .fromTo(headingRef.current, { opacity: 0, y: 50 },      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
      .fromTo(subtitleRef.current,{ opacity: 0, x: -20 },    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      .fromTo(descRef.current,    { opacity: 0, y: 20 },      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .fromTo(ctaRef.current,     { opacity: 0, y: 20 },      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .fromTo(statsRef.current,   { opacity: 0 },             { opacity: 1, duration: 0.4 }, '-=0.1')
      .fromTo(cubeRef.current,    { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.5')
      .fromTo(cornerRef.current,  { opacity: 0 },             { opacity: 0.6, duration: 0.4 }, '-=0.3')
      .fromTo(scrollRef.current,  { opacity: 0 },             { opacity: 1, duration: 0.4 }, '+=0.2')
  }, [])

  // Typewriter loop
  useEffect(() => {
    const current = TYPING_STRINGS[strIdx]
    let timer
    if (!deleting && charIdx <= current.length) {
      setText(current.substring(0, charIdx))
      timer = setTimeout(() => setCharIdx(c => c + 1), 85)
    } else if (deleting && charIdx >= 0) {
      setText(current.substring(0, charIdx))
      timer = setTimeout(() => setCharIdx(c => c - 1), 45)
    } else if (!deleting) {
      timer = setTimeout(() => setDeleting(true), 2200)
    } else {
      setDeleting(false)
      setStrIdx(s => (s + 1) % TYPING_STRINGS.length)
      setCharIdx(0)
    }
    return () => clearTimeout(timer)
  }, [charIdx, deleting, strIdx])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl" style={{ background: 'var(--neon-cyan)' }} />
        <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full opacity-[0.05] blur-3xl" style={{ background: 'var(--neon-magenta)' }} />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10 grid lg:grid-cols-12 gap-8 items-center min-h-screen py-32">

        {/* Left vertical sidebar */}
        <div
          ref={sideRef}
          className="hidden lg:flex flex-col items-center col-span-1 gap-4 self-stretch py-16 opacity-0"
        >
          <div className="w-1.5 h-1.5 rounded-full pulse-glow" style={{ background: 'var(--neon-green)' }} />
          <p
            className="font-mono text-xs tracking-widest"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              color: 'var(--neon-green)',
              textShadow: '0 0 8px var(--neon-green)',
            }}
          >
            [ SYSTEM ONLINE ] — v2.0
          </p>
          <div className="flex-1 w-px opacity-30" style={{ background: 'linear-gradient(to bottom, var(--neon-cyan), transparent)' }} />
        </div>

        {/* Main content */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          {/* Tag */}
          <div ref={tagRef} className="flex items-center gap-3 opacity-0">
            <Terminal size={13} style={{ color: 'var(--neon-magenta)' }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--neon-magenta)', textShadow: '0 0 6px var(--neon-magenta)' }}>
              // SYS.INITIALIZE — PORTFOLIO v2.0
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="font-display font-black uppercase glitch opacity-0"
            data-text="ADITYA ASHOK SINGH"
            style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.2rem)', letterSpacing: '0.04em', lineHeight: 1.05 }}
          >
            ADITYA<br />
            <span style={{ color: 'var(--neon-cyan)', textShadow: '0 0 25px var(--neon-cyan)' }}>ASHOK SINGH</span>
          </h1>

          {/* Typewriter */}
          <div
            ref={subtitleRef}
            className="font-mono text-lg md:text-xl terminal-cursor opacity-0"
            style={{ color: 'var(--text-secondary)', minHeight: '2rem' }}
          >
            {text}
          </div>

          {/* Bio */}
          <p
            ref={descRef}
            className="font-body text-base md:text-lg max-w-xl leading-relaxed opacity-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            B.Tech Computer Science student at Lovely Professional University.
            Engineering full-stack web applications and robust containerized DevOps pipelines
            using React, Node.js, Express, MongoDB, PostgreSQL, Docker, and Redis.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 pt-2 opacity-0">
            <button className="btn-cyber group flex items-center gap-2" onClick={() => scrollTo('projects')}>
              <span className="flex items-center gap-2">
                View_Projects
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <button className="btn-cyber-outline flex items-center gap-2" onClick={() => scrollTo('contact')}>
              <span className="flex items-center gap-2">
                <Mail size={14} />
                Contact_Me
              </span>
            </button>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="flex flex-wrap gap-8 pt-4 opacity-0"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            {[
              { value: '3+', label: 'Core Projects' },
              { value: '8.11', label: 'B.Tech CGPA' },
              { value: '100+', label: 'Users Evaluated' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-2xl font-bold" style={{ color: 'var(--neon-cyan)', textShadow: '0 0 10px var(--neon-cyan)' }}>
                  {value}
                </div>
                <div className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Holo Cube */}
        <div ref={cubeRef} className="col-span-12 lg:col-span-4 hidden lg:flex items-center justify-center opacity-0">
          <HoloCube />
        </div>
      </div>

      {/* Corner metadata */}
      <div
        ref={cornerRef}
        className="absolute top-24 right-6 text-right hidden lg:block opacity-0"
      >
        {[['SEC','001'],['LOC','INDIA'],['STATUS','ONLINE']].map(([k, v]) => (
          <p key={k} className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            <span style={{ color: 'var(--neon-cyan)' }}>{k}</span>: {v}
          </p>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-0"
        onClick={() => scrollTo('about')}
      >
        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>Scroll</span>
        <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, var(--neon-cyan), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        <ChevronDown size={13} style={{ color: 'var(--neon-cyan)', marginTop: '-8px' }} />
      </div>
    </section>
  )
}
