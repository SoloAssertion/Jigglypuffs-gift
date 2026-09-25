import { motion } from 'framer-motion'

interface Props {
  onRestart: () => void
}

export default function PathGoodbye({ onRestart }: Props) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1 }}
    >
      {/* Very subtle cool glow — quieter than other screens */}
      <div
        className="pointer-events-none fixed"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75vw', height: '75vw',
          background: 'radial-gradient(circle, rgba(180,190,210,0.055) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-auto">

        {/* Icon — slower, softer entrance */}
        <motion.div
          style={{ fontSize: '2.2rem', marginBottom: '1.4rem', opacity: 0.65 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.65, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          🕊️
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="font-sans"
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--rose)',
            opacity: 0.6,
            marginBottom: '1rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.7 }}
        >
          path b — with grace
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-serif"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(2.2rem, 9vw, 3.4rem)',
            color: 'rgba(247,238,240,0.78)',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <em>Go well.</em>
        </motion.h2>

        {/* Divider */}
        <motion.div
          style={{
            width: '36px', height: '1px',
            background: 'rgba(247,238,240,0.12)',
            margin: '1.5rem auto',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        />

        {/* Message — CUSTOMIZE THIS */}
        <motion.p
          className="font-serif"
          style={{
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3.8vw, 1.15rem)',
            lineHeight: 1.9,
            color: 'rgba(247,238,240,0.52)',
            marginBottom: '2rem',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.8 }}
        >
          Some chapters close, and that's okay. What we
          shared was real — the laughs, the conversations,
          the moments that mattered — and none of that gets
          erased just because we walk different roads from
          here. I hold no resentment. Only gratitude, for
          the season we had. Go be everything you're meant
          to be. I mean that completely.
        </motion.p>

        {/* Quote card — dimmer, cooler than Path A */}
        <motion.div
          style={{
            padding: '1.1rem 1.4rem',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(247,238,240,0.07)',
            borderRadius: '16px',
            marginBottom: '1.75rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p
            className="font-serif"
            style={{
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'rgba(247,238,240,0.32)',
              lineHeight: 1.75,
            }}
          >
            "Not all endings are losses.
            <br />Some are just completions."
          </p>
        </motion.div>

        {/* Final sign-off */}
        <motion.p
          className="font-serif"
          style={{
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: 'rgba(247,238,240,0.28)',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          Happy birthday.
          <br />Take care of yourself.
        </motion.p>

        {/* Restart */}
        <motion.button
          onClick={onRestart}
          className="font-sans"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(247,238,240,0.18)',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            transition: 'color 0.3s',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(247,238,240,0.38)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(247,238,240,0.18)' }}
        >
          start over
        </motion.button>

      </div>
    </motion.div>
  )
}