import { motion } from 'framer-motion'

interface Props {
  onRestart: () => void
}

export default function PathUndecided({ onRestart }: Props) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1 }}
    >
      {/* Neutral, calming ambient glow */}
      <div
        className="pointer-events-none fixed"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75vw', height: '75vw',
          background: 'radial-gradient(circle, rgba(200,180,210,0.05) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-auto">

        {/* Icon — calm, open-ended */}
        <motion.div
          style={{ fontSize: '2.2rem', marginBottom: '1.4rem', opacity: 0.7 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          🍀
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
          path c — taking time
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
          <em>Take your time.</em>
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

        {/* Message */}
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
          You don't have to have it all figured out right
          now. Some decisions are too heavy to rush, and
          some moments just need space to breathe. Wherever
          your head is at, there's no pressure here. No
          expectations. Just room to be.
        </motion.p>

        {/* Quote card */}
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
            "Clarity doesn't come from forcing answers.
            <br />It comes from letting the dust settle."
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
          <br />No rush, no worries.
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
