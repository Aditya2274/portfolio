import React, { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const trailRef  = useRef([])
  const posRef    = useRef({ x: -200, y: -200 })
  const ringPos   = useRef({ x: -200, y: -200 })
  const animId    = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }

      // Create spark
      const spark = document.createElement('div')
      spark.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px; height: 4px;
        border-radius: 50%;
        background: var(--neon-cyan);
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 6px var(--neon-cyan);
        transition: opacity 0.4s, transform 0.4s;
      `
      document.body.appendChild(spark)
      requestAnimationFrame(() => {
        spark.style.opacity = '0'
        spark.style.transform = `translate(${(Math.random()-0.5)*30}px, ${(Math.random()-0.5)*30}px) scale(0)`
      })
      setTimeout(() => spark.remove(), 400)
    }

    const lerp = (a, b, n) => a + (b - a) * n

    const animate = () => {
      // Dot: snap directly
      dot.style.left = posRef.current.x + 'px'
      dot.style.top  = posRef.current.y + 'px'

      // Ring: lag behind
      ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.1)
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top  = ringPos.current.y + 'px'

      animId.current = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId.current)
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          background: 'var(--neon-cyan)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px var(--neon-cyan)',
          transition: 'width 0.15s, height 0.15s',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          border: '1px solid rgba(0, 245, 255, 0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}
