import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import About    from './components/About'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact  from './components/Contact'
import Footer   from './components/Footer'
import CursorTrail from './components/CursorTrail'
import Background  from './components/Background'

gsap.registerPlugin(ScrollTrigger)

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('Portfolio render error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', background: '#020408', color: '#00f5ff', minHeight: '100vh' }}>
          <h1 style={{ color: '#ff006e' }}>RENDER ERROR</h1>
          <pre style={{ color: '#e8f4fd', marginTop: '1rem', whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

function LoadingScreen({ onComplete }) {
  const screenRef  = useRef(null)
  const textRef    = useRef(null)
  const barRef     = useRef(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count += Math.random() * 15 + 5
      if (count >= 100) {
        count = 100
        clearInterval(interval)
        // Animate out
        setTimeout(() => {
          gsap.to(screenRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete,
          })
        }, 300)
      }
      setPct(Math.floor(count))
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      ref={screenRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-void)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {/* Logo */}
      <div
        className="font-display font-black text-4xl tracking-widest flicker"
        style={{ color: 'var(--neon-cyan)', textShadow: '0 0 20px var(--neon-cyan)' }}
      >
        &lt;<span style={{ color: 'var(--neon-magenta)' }}>A</span>_&gt;
      </div>

      {/* Loading bar */}
      <div style={{ width: '200px' }}>
        <div
          className="progress-bar"
          style={{ height: '2px', background: 'rgba(0,245,255,0.1)' }}
        >
          <div
            className="progress-bar-fill"
            style={{
              height: '100%',
              width: pct + '%',
              background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
              boxShadow: '0 0 8px var(--neon-cyan)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <p
          className="font-mono text-xs mt-2 text-center"
          style={{ color: 'var(--text-dim)' }}
        >
          LOADING SYS... {pct}%
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ErrorBoundary>
      <div className="bg-bg-void min-h-screen">
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

        <Background />
        <CursorTrail />

        <div className="relative z-10">
          <Navbar scrollProgress={scrollProgress} />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />
          <Footer />
        </div>
      </div>
    </ErrorBoundary>
  )
}
