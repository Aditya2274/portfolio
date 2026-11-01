import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all' // or 'gsap/ScrollTrigger' depending on GSAP version

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-void':       'var(--bg-void)',
        'bg-deep':       'var(--bg-deep)',
        'bg-surface':    'var(--bg-surface)',
        'bg-elevated':   'var(--bg-elevated)',
        'bg-glass':      'var(--bg-glass)',
        'neon-cyan':     'var(--neon-cyan)',
        'neon-magenta':  'var(--neon-magenta)',
        'neon-green':    'var(--neon-green)',
        'neon-yellow':   'var(--neon-yellow)',
        'neon-violet':   'var(--neon-violet)',
        'accent-primary':   'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'text-primary':  'var(--text-primary)',
        'text-secondary':'var(--text-secondary)',
        'text-dim':      'var(--text-dim)',
        // Legacy compat
        'cyber-dark':    'var(--bg-void)',
        'cyber-accent':  'var(--neon-cyan)',
        'cyber-purple':  'var(--neon-violet)',
        'cyber-bg':      'var(--bg-deep)',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono:    ['Share Tech Mono', 'monospace'],
        body:    ['Rajdhani', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
        space:   ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
