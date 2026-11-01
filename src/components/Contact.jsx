import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, GitFork, Link, Mail, Phone, Terminal, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  {
    icon: GitFork,
    label: 'GitHub',
    handle: 'github.com/Aditya2274',
    href: 'https://github.com/Aditya2274',
    accent: 'var(--neon-cyan)',
  },
  {
    icon: Link,
    label: 'LinkedIn',
    handle: 'linkedin.com/in/aditya-ashok-singh-01b320282',
    href: 'https://www.linkedin.com/in/aditya-ashok-singh-01b320282/',
    accent: 'var(--neon-violet)',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'adityaashoksingh7@gmail.com',
    href: 'mailto:adityaashoksingh7@gmail.com',
    accent: 'var(--neon-magenta)',
  },
  {
    icon: Phone,
    label: 'Phone / Mobile',
    handle: '+91-8299788240',
    href: 'tel:+918299788240',
    accent: 'var(--neon-green)',
  },
]

export default function Contact() {
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus]       = useState('idle') // idle | sending | sent | error
  const [statusMsg, setStatusMsg] = useState('')
  const sectionRef  = useRef(null)
  const headRef     = useRef(null)
  const leftRef     = useRef(null)
  const rightRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, x: -40, duration: 0.7, ease: 'power3.out',
      })
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: leftRef.current, start: 'top 80%', once: true },
        opacity: 0, x: -40, duration: 0.6, ease: 'power2.out',
      })
      gsap.from(rightRef.current, {
        scrollTrigger: { trigger: rightRef.current, start: 'top 80%', once: true },
        opacity: 0, x: 40, duration: 0.6, ease: 'power2.out', delay: 0.1,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setStatusMsg('Transmitting message...')

    try {
      const response = await fetch('https://formsubmit.co/ajax/adityaashoksingh7@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: `[Portfolio Inquiry] ${form.subject || 'New Message'} from ${form.name}`,
          message: form.message,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.success !== 'false') {
        setStatus('sent')
        setStatusMsg('Message transmitted successfully! I will get back to you shortly.')
        setTimeout(() => {
          setStatus('idle')
          setStatusMsg('')
          setForm({ name: '', email: '', subject: '', message: '' })
        }, 5000)
      } else {
        // If external service returned error, fallback to mailto
        triggerMailtoFallback()
      }
    } catch (err) {
      console.warn('Form submission encountered network error, falling back to mail client:', err)
      triggerMailtoFallback()
    }
  }

  const triggerMailtoFallback = () => {
    const mailtoUrl = `mailto:adityaashoksingh7@gmail.com?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${form.subject || 'New Message'} - ${form.name}`
    )}&body=${encodeURIComponent(
      `Hi Aditya,\n\n${form.message}\n\nRegards,\n${form.name}\nEmail: ${form.email}`
    )}`

    window.location.href = mailtoUrl
    setStatus('sent')
    setStatusMsg('Opening default email client with your message pre-filled...')
    setTimeout(() => {
      setStatus('idle')
      setStatusMsg('')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 6000)
  }

  const directMailtoUrl = `mailto:adityaashoksingh7@gmail.com?subject=${encodeURIComponent(
    form.subject ? `[Portfolio Inquiry] ${form.subject}` : 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    form.message
      ? `Hi Aditya,\n\n${form.message}\n\nRegards,\n${form.name || ''}\nEmail: ${form.email || ''}`
      : 'Hi Aditya,'
  )}`

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 relative z-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom center, rgba(0,245,255,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div ref={headRef} className="mb-16">
          <p className="section-tag mb-2">// 05 — CONTACT</p>
          <h2 className="section-title">Let's<span style={{ color: 'var(--neon-cyan)' }}>_Connect</span></h2>
          <div className="section-line" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* Left panel */}
          <div ref={leftRef} className="lg:col-span-2 space-y-8">
            <div>
              <p
                className="font-mono text-xs uppercase tracking-wider mb-3"
                style={{ color: 'var(--neon-cyan)' }}
              >
                <Terminal size={12} className="inline mr-2" />
                STATUS: OPEN_TO_OPPORTUNITIES
              </p>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I'm actively looking for <span style={{ color: 'var(--neon-cyan)' }}>backend internships</span> and <span style={{ color: 'var(--neon-magenta)' }}>project collaborations</span>. Whether it's a startup, open source, or just an interesting problem — let's talk.
              </p>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
                // Find me at
              </h3>
              {SOCIALS.map(({ icon: Icon, label, handle, href, accent }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 cyber-card group"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                    style={{ border: `1px solid ${accent}30`, background: accent + '0d' }}
                  >
                    <Icon size={15} style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>{label}</p>
                    <p className="font-mono text-sm transition-colors duration-200" style={{ color: accent }}>
                      {handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Available tag */}
            <div
              className="p-4"
              style={{
                border: '1px solid rgba(57,255,20,0.2)',
                background: 'rgba(57,255,20,0.04)',
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full pulse-glow"
                  style={{ background: 'var(--neon-green)' }}
                />
                <span className="font-mono text-xs" style={{ color: 'var(--neon-green)' }}>
                  Available for work — Response within 24h
                </span>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div ref={rightRef} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="cyber-card p-8 space-y-6">
              <h3 className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
                // Send_Message
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{ color: 'var(--neon-cyan)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="cyber-input"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{ color: 'var(--neon-cyan)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="cyber-input"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{ color: 'var(--neon-cyan)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="cyber-input"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{ color: 'var(--neon-cyan)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="cyber-input resize-none"
                />
              </div>

              {/* Status banner */}
              {statusMsg && (
                <div
                  className="p-3 font-mono text-xs flex items-center gap-2"
                  style={{
                    border: `1px solid ${status === 'sent' ? 'rgba(57,255,20,0.5)' : status === 'error' ? 'rgba(255,0,110,0.5)' : 'rgba(0,245,255,0.4)'}`,
                    background: `${status === 'sent' ? 'rgba(57,255,20,0.08)' : status === 'error' ? 'rgba(255,0,110,0.08)' : 'rgba(0,245,255,0.08)'}`,
                    color: status === 'sent' ? 'var(--neon-green)' : status === 'error' ? 'var(--neon-magenta)' : 'var(--neon-cyan)',
                  }}
                >
                  {status === 'sent' && <CheckCircle size={14} />}
                  {status === 'error' && <AlertCircle size={14} />}
                  <span>{statusMsg}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full btn-cyber flex items-center justify-center gap-3 disabled:opacity-60"
                style={{
                  clipPath: 'none',
                  padding: '1rem',
                  fontSize: '0.8rem',
                }}
              >
                {status === 'idle' && (
                  <><span>Send_Message</span><Send size={14} /></>
                )}
                {status === 'sending' && (
                  <span className="font-mono text-xs">TRANSMITTING...</span>
                )}
                {status === 'sent' && (
                  <>
                    <CheckCircle size={14} style={{ color: 'var(--neon-green)' }} />
                    <span>MESSAGE_TRANSMITTED</span>
                  </>
                )}
                {status === 'error' && (
                  <>
                    <AlertCircle size={14} style={{ color: 'var(--neon-magenta)' }} />
                    <span>FAILED — RETRY</span>
                  </>
                )}
              </button>

              {/* Direct Mail Client Link */}
              <div className="pt-2 text-center">
                <a
                  href={directMailtoUrl}
                  className="inline-flex items-center gap-2 font-mono text-xs transition-colors duration-200 hover:text-neon-cyan"
                  style={{ color: 'var(--text-dim)' }}
                >
                  <Mail size={12} />
                  <span>Or click here to open default email client &rarr;</span>
                </a>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
