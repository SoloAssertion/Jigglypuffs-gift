import { motion } from 'framer-motion'

interface Props {
  onChoose: (choice: 'yes' | 'no') => void
}

interface ForkCardProps {
  icon: string
  title: string
  description: string
  onClick: () => void
  delay: number
}

function ForkCard({ icon, title, description, onClick, delay }: ForkCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full text-left"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(247,238,240,0.08)',
        borderRadius: '20px',
        padding: '1.4rem 1.25rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={e => {
        const t = e.currentTarget
        t.style.background = 'rgba(201,132,138,0.08)'
        t.style.borderColor = 'rgba(201,132,138,0.28)'
        t.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const t = e.currentTarget
        t.style.background = 'rgba(255,255,255,0.03)'
        t.style.borderColor = 'rgba(247,238,240,0.08)'
        t.style.transform = 'translateY(0px)'
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '0.75rem' }}>
        {icon}
      </span>

      {/* Title */}
      <p
        className="font-serif"
        style={{
          fontWeight: 400,
          fontSize: 'clamp(1.15rem, 4.5vw, 1.35rem)',
          color: 'var(--mist)',
          marginBottom: '0.4rem',
          lineHeight: 1.3,
        }}
      >
        {title}
      </p>

      {/* Description */}
      <p
        className="font-sans"
        style={{
          fontWeight: 300,
          fontSize: '0.82rem',
          lineHeight: 1.7,
          color: 'rgba(247,238,240,0.48)',
        }}
      >
        {description}
      </p>
    </motion.button>
  )
}

export default function PhaseCrossroads({ onChoose }: Props) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none fixed"
        style={{
          top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '70vw', height: '70vw',
          background: 'radial-gradient(circle, rgba(201,132,138,0.09) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-auto">

        {/* Eyebrow */}
        <motion.p
          className="font-sans text-center"
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
          transition={{ delay: 0.2 }}
        >
          the crossroads
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-serif text-center"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            lineHeight: 1.2,
            color: 'var(--mist)',
            marginBottom: '1rem',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          Every story reaches
          <br />
          <em style={{ color: 'var(--blush)' }}>a fork.</em>
        </motion.h2>

        {/* Question */}
        <motion.p
          className="font-serif text-center"
          style={{
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3.5vw, 1.15rem)',
            color: 'rgba(247,238,240,0.55)',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          What path do we take from here?
        </motion.p>

        {/* Soft divider */}
        <motion.div
          style={{
            width: '36px',
            height: '1px',
            background: 'rgba(201,132,138,0.3)',
            margin: '0 auto 2rem',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        />

        {/* Fork cards */}
        <div className="flex flex-col gap-3">
          <ForkCard
            icon="🌸"
            title="Let's be friends again"
            description="Start fresh, rebuild what was good, and carry forward only the best of what we were."
            onClick={() => onChoose('yes')}
            delay={0.8}
          />
          <ForkCard
            icon="🕊️"
            title="It's time to say goodbye"
            description="Honour what was, part without bitterness, and wish each other only the very best."
            onClick={() => onChoose('no')}
            delay={0.95}
          />
        </div>

        {/* Footer note */}
        <motion.p
          className="font-sans text-center"
          style={{
            fontSize: '0.72rem',
            fontWeight: 300,
            color: 'rgba(247,238,240,0.2)',
            marginTop: '2rem',
            letterSpacing: '0.04em',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          there's no wrong answer here
        </motion.p>

      </div>
    </motion.div>
  )
}