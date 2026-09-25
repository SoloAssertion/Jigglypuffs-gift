import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onRestart: () => void
}

function useConfetti(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const palette = [
      '#F2D5D0', '#C9848A', '#C9A87A',
      '#F7EEF0', '#E8B4B8', '#D4A5A5',
      '#F0C8C8', '#E8D5C0',
    ]

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 5 + 2.5,
      color: palette[Math.floor(Math.random() * palette.length)],
      tiltAngle: Math.random() * Math.PI * 2,
      tiltSpeed: Math.random() * 0.07 + 0.03,
      vx: Math.random() * 1.5 - 0.75,
      vy: Math.random() * 2.5 + 1.5,
      opacity: Math.random() * 0.55 + 0.35,
      d: Math.random() * 30,
    }))

    let tick = 0
    let frame: number
    let running = true

    const draw = () => {
      if (!running) return
      tick++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pieces.forEach(p => {
        p.tiltAngle += p.tiltSpeed
        p.y += p.vy
        p.x += p.vx + Math.sin(tick * 0.018 + p.d) * 0.5

        if (p.y > canvas.height + 20) {
          p.y = -12
          p.x = Math.random() * canvas.width
        }

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(
          p.x + Math.sin(p.tiltAngle) * 8,
          p.y,
          p.r,
          p.r * 0.45,
          p.tiltAngle,
          0,
          Math.PI * 2
        )
        ctx.fill()
        ctx.restore()
      })

      // Stop after ~7 seconds
      if (tick < 420) {
        frame = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    draw()

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [canvasRef])
}

export default function PathReconciliation({ onRestart }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useConfetti(canvasRef)

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />

      {/* Warm ambient glow */}
      <div
        className="pointer-events-none fixed"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw', height: '80vw',
          background: 'radial-gradient(circle, rgba(201,132,138,0.11) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-auto">

        {/* Animated icon */}
        <motion.div
          style={{ fontSize: '2.8rem', marginBottom: '1.25rem' }}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.3 }}
        >
          🌸
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="font-sans"
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--rose)',
            opacity: 0.85,
            marginBottom: '1rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.5 }}
        >
          path a — new beginnings
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-serif"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(2.2rem, 9vw, 3.4rem)',
            color: 'var(--mist)',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          <em style={{ color: 'var(--blush)' }}>Welcome back.</em>
        </motion.h2>

        {/* Divider */}
        <motion.div
          style={{
            width: '36px', height: '1px',
            background: 'rgba(201,132,138,0.35)',
            margin: '1.5rem auto',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
        />

        {/* Message — CUSTOMIZE THIS */}
        <motion.p
          className="font-serif"
          style={{
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3.8vw, 1.15rem)',
            lineHeight: 1.85,
            color: 'rgba(247,238,240,0.72)',
            marginBottom: '2rem',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          You chose to come back — and that takes something.
          I won't make it dramatic. I'll just say I'm glad.
          We had something real, and real things are worth
          the effort of repairing. I don't want to go back
          to what we were — I want to build something better,
          with everything we've learned since. Thank you for
          choosing this path. Happy birthday. Let's begin.
        </motion.p>

        {/* Quote card */}
        <motion.div
          style={{
            padding: '1.1rem 1.4rem',
            background: 'rgba(201,132,138,0.07)',
            border: '1px solid rgba(201,132,138,0.16)',
            borderRadius: '16px',
            marginBottom: '2.5rem',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p
            className="font-serif"
            style={{
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'var(--blush)',
              lineHeight: 1.7,
            }}
          >
            "Some stories are worth a second draft."
          </p>
        </motion.div>

        {/* Restart */}
        <motion.button
          onClick={onRestart}
          className="font-sans"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(247,238,240,0.22)',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            transition: 'color 0.3s',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(247,238,240,0.45)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(247,238,240,0.22)' }}
        >
          start over
        </motion.button>

      </div>
    </motion.div>
  )
}