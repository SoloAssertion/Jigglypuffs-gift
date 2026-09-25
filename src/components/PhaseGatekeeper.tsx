import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onYes: () => void
}

const BTN_W = 120
const BTN_H = 44

export default function PhaseGatekeeper({ onYes }: Props) {
  const [noPos, setNoPos] = useState({ top: '85%', left: '40%' })

  const flee = useCallback(() => {
    const maxX = window.innerWidth - BTN_W - 16
    const maxY = window.innerHeight - BTN_H - 16

    const dangerTop = window.innerHeight * 0.52
    const dangerBottom = window.innerHeight * 0.72
    const dangerLeft = window.innerWidth * 0.15
    const dangerRight = window.innerWidth * 0.75

    let newTop: number
    let newLeft: number

    do {
      newTop = Math.max(16, Math.floor(Math.random() * maxY))
      newLeft = Math.max(16, Math.floor(Math.random() * maxX))
    } while (
      newTop > dangerTop &&
      newTop < dangerBottom &&
      newLeft > dangerLeft &&
      newLeft < dangerRight
    )

    setNoPos({ top: `${newTop}px`, left: `${newLeft}px` })
  }, [])

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.7 }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none fixed"
        style={{
          top: '-25%', left: '-15%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(201,132,138,0.13) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <div
        className="pointer-events-none fixed"
        style={{
          bottom: '-25%', right: '-15%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(201,168,122,0.09) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm mx-auto">

        {/* Eyebrow */}
        <motion.p
          className="font-sans mb-5"
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--rose)',
            opacity: 0.85,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          a little something for you
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-serif"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 10vw, 4.5rem)',
            lineHeight: 1.15,
            color: 'var(--mist)',
            marginBottom: '1.25rem',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Happy Birthday,
          <br />
          <em style={{ color: 'var(--blush)' }}>you.</em>
        </motion.h1>

        {/* Sub-prompt */}
        <motion.p
          className="font-serif"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
            color: 'rgba(247,238,240,0.6)',
            marginBottom: '2rem',
            lineHeight: 1.65,
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          Before you step inside,
          <br />I have one question for you...
        </motion.p>

        {/* Main question */}
        <motion.p
          className="font-serif"
          style={{
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 4.5vw, 1.55rem)',
            color: 'rgba(247,238,240,0.88)',
            lineHeight: 1.6,
            marginBottom: '2.75rem',
            maxWidth: '340px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
        >
          "Are you ready to take a walk down memory lane with me?"
        </motion.p>

        {/* Yes button */}
        <motion.button
          onClick={onYes}
          className="font-serif"
          style={{
            fontWeight: 400,
            fontSize: '1.15rem',
            letterSpacing: '0.04em',
            padding: '0.85rem 2.8rem',
            borderRadius: '999px',
            border: '1px solid rgba(201,132,138,0.55)',
            background: 'rgba(201,132,138,0.12)',
            color: 'var(--blush)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileTap={{ scale: 0.96 }}
          onMouseEnter={e => {
            const t = e.currentTarget
            t.style.background = 'rgba(201,132,138,0.22)'
            t.style.borderColor = 'var(--rose)'
            t.style.color = 'var(--mist)'
          }}
          onMouseLeave={e => {
            const t = e.currentTarget
            t.style.background = 'rgba(201,132,138,0.12)'
            t.style.borderColor = 'rgba(201,132,138,0.55)'
            t.style.color = 'var(--blush)'
          }}
        >
          Yes, I'm ready
        </motion.button>
      </div>

      {/* Evasive No button */}
      <button
        onMouseEnter={flee}
        onTouchStart={flee}
        onClick={flee}
        className="font-sans"
        style={{
          position: 'fixed',
          top: noPos.top,
          left: noPos.left,
          width: `${BTN_W}px`,
          height: `${BTN_H}px`,
          borderRadius: '999px',
          border: '1px solid rgba(247,238,240,0.45)',
          background: 'transparent',
          color: 'rgba(247,238,240,0.75)',
          fontSize: '0.78rem',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          zIndex: 999,
          transition: 'top 0s, left 0s',
          userSelect: 'none',
        }}
      >
        Not yet...
      </button>
    </motion.div>
  )
}