import React, { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId

    const COLORS = ['#00f5ff', '#ff006e', '#bf5fff', '#39ff14']
    const NODE_COUNT = 80

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: Math.random(),
      blink: Math.random() > 0.85,
    }))

    let frame = 0

    function draw() {
      ctx.clearRect(0, 0, W, H)
      frame++

      nodes.forEach((n, i) => {
        // Move
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0) n.x = W
        if (n.x > W) n.x = 0
        if (n.y < 0) n.y = H
        if (n.y > H) n.y = 0

        // Blink
        const alpha = n.blink
          ? 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.05 + i))
          : 0.5

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const dx = n.x - m.x
          const dy = n.y - m.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.12
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.strokeStyle = `rgba(0, 245, 255, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.color + Math.round(alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
        // Glow
        ctx.shadowColor = n.color
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      <div className="cyber-grid" />
      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(2,4,8,0.7) 100%)',
        }}
      />
    </>
  )
}
