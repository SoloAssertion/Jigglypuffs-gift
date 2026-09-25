import { motion } from 'framer-motion'
import { STAGES } from '../data/stages'

interface Props {
  onContinue: () => void
}

export default function PhaseTimeline({ onContinue }: Props) {
  return (
    <motion.div
      className="relative flex flex-col items-center min-h-screen px-6 py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed"
        style={{
          top: '-20%', right: '-20%',
          width: '55vw', height: '55vw',
          background: 'radial-gradient(circle, rgba(201,132,138,0.10) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <div
        className="pointer-events-none fixed"
        style={{
          bottom: '-20%', left: '-20%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(201,168,122,0.07) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-auto">

        {/* Eyebrow */}
        <motion.p
          className="font-sans text-center mb-3"
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--rose)',
            opacity: 0.85,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.2 }}
        >
          memory lane
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-serif text-center"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            lineHeight: 1.2,
            color: 'var(--mist)',
            marginBottom: '3rem',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          Our story,
          <br />
          <em style={{ color: 'var(--blush)' }}>in chapters.</em>
        </motion.h2>

        {/* Timeline */}
        <div className="flex flex-col">
          {STAGES.map((stage, i) => (
            <motion.div
              key={i}
              className="flex gap-5"
              style={{ marginBottom: i < STAGES.length - 1 ? '0' : '0' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
            >
              {/* Dot + line column */}
              <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: '0.2rem' }}>
                {/* Dot */}
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--rose)',
                    flexShrink: 0,
                  }}
                />
                {/* Connector line — hidden on last item */}
                {i < STAGES.length - 1 && (
                  <div
                    style={{
                      width: '1px',
                      flexGrow: 1,
                      minHeight: '60px',
                      marginTop: '6px',
                      background: 'linear-gradient(to bottom, rgba(201,132,138,0.4), rgba(201,132,138,0.04))',
                    }}
                  />
                )}
              </div>

              {/* Text content */}
              <div style={{ paddingBottom: i < STAGES.length - 1 ? '2.5rem' : '0' }}>
                {/* Stage label */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.58rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--rose)',
                    opacity: 0.75,
                    marginBottom: '0.4rem',
                  }}
                >
                  {stage.label}
                </p>

                {/* Stage title */}
                <h3
                  className="font-serif"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(1.25rem, 5vw, 1.5rem)',
                    color: 'var(--mist)',
                    lineHeight: 1.3,
                    marginBottom: '0.65rem',
                  }}
                >
                  {stage.title}
                </h3>

                {/* Stage body */}
                <p
                  className="font-sans"
                  style={{
                    fontWeight: 300,
                    fontSize: '0.88rem',
                    lineHeight: 1.8,
                    color: 'rgba(247,238,240,0.58)',
                  }}
                >
                  {stage.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft divider */}
        <motion.div
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(201,132,138,0.3)',
            margin: '2.5rem auto',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        />

        {/* Continue button */}
        <motion.div
          className="flex justify-center"
          style={{ paddingBottom: '3rem' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <motion.button
            onClick={onContinue}
            className="font-serif"
            style={{
              fontWeight: 400,
              fontSize: '1.1rem',
              letterSpacing: '0.04em',
              padding: '0.8rem 2.4rem',
              borderRadius: '999px',
              border: '1px solid rgba(201,132,138,0.45)',
              background: 'transparent',
              color: 'var(--blush)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            whileTap={{ scale: 0.96 }}
            onMouseEnter={e => {
              const t = e.currentTarget
              t.style.background = 'rgba(201,132,138,0.12)'
              t.style.borderColor = 'var(--rose)'
              t.style.color = 'var(--mist)'
            }}
            onMouseLeave={e => {
              const t = e.currentTarget
              t.style.background = 'transparent'
              t.style.borderColor = 'rgba(201,132,138,0.45)'
              t.style.color = 'var(--blush)'
            }}
          >
            Continue to the end →
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  )
}