import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { notify } from '../utils/notify'

interface Props {
  onChoose: (choice: 'yes' | 'no' | 'dont know') => void
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
      <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '0.75rem' }}>
        {icon}
      </span>
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
  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  // 🔒 SET YOUR SECRET KEY HERE
  const SECRET_KEY = 'AYUSHI2510'

  const handleTerminate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.trim() === SECRET_KEY) {
      localStorage.setItem('site_destroyed', 'true')

      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: 'destroyed' }),
      }).catch(() => {})

      window.location.reload()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top-Right Terminate Button Overlay — Red Styled */}
      <button
        onClick={() => {
          setPassword('')
          setShowModal(true)
        }}
        className="font-sans fixed top-4 right-4 z-50"
        style={{
          background: 'transparent',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '999px',
          padding: '0.4rem 0.9rem',
          color: 'rgba(239, 68, 68, 0.65)',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = 'rgba(239, 68, 68, 1)'
          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)'
          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(239, 68, 68, 0.65)'
          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)'
          e.currentTarget.style.background = 'transparent'
        }}
      >
        terminate site
      </button>

      {/* Password Prompt Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ background: 'rgba(5,5,7,0.85)', backdropFilter: 'blur(8px)', zIndex: 100 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-xs rounded-2xl text-center"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(247,238,240,0.1)'}`,
                boxShadow: error ? '0 0 15px rgba(239, 68, 68, 0.15)' : 'none',
                padding: '1.8rem 1.4rem', // Generous padding all around so it's not cramped
                transition: 'border 0.3s ease',
              }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <p className="font-serif text-sm" style={{ color: 'var(--mist)', fontWeight: 300, marginBottom: '1.25rem' }}>
                {error ? <span style={{ color: '#ef4444' }}>Incorrect credentials</span> : 'Enter credentials to terminate site'}
              </p>
              
              <form onSubmit={handleTerminate} className="flex flex-col gap-4">
                <input
                  type="password"
                  placeholder="YOURNAME(DDMM)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                  className="w-full text-center font-sans text-xs outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${error ? 'rgba(239, 68, 68, 0.8)' : 'rgba(247,238,240,0.15)'}`,
                    borderRadius: '12px',
                    padding: '0.8rem',
                    color: 'var(--mist)',
                    letterSpacing: '0.08em',
                  }}
                />

                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 font-sans text-xs uppercase"
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(247,238,240,0.1)',
                      borderRadius: '10px',
                      padding: '0.65rem',
                      color: 'rgba(247,238,240,0.4)',
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 font-sans text-xs uppercase"
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      borderRadius: '10px',
                      padding: '0.65rem',
                      color: '#ef4444',
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Terminate
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


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
          <em style={{ color: 'var(--blush)' }}>an end.</em>
        </motion.h2>

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

        <div className="flex flex-col gap-3">
          <ForkCard
            icon="🌸"
            title="Let's be friends again"
            description="Start fresh, rebuild what was good..."
            onClick={() => {
              notify('yes')
              onChoose('yes')
            }}
            delay={0.8}
          />
          <ForkCard
            icon="🕊️"
            title="It's time to say goodbye"
            description="Honour what was, part without bitterness..."
            onClick={() => {
              notify('no')
              onChoose('no')
            }}
            delay={0.95}
          />
          <ForkCard
            icon="❓"
            title="Dont wanna answer.."
            description="Dont feel like answering? its okay.."
            onClick={() => {
              notify('dont know')
              onChoose('dont know')
            }}
            delay={1.1}
          />
        </div>

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
