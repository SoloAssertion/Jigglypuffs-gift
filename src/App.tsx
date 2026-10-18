import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import PhaseGatekeeper from './components/PhaseGatekeeper'
import PhaseTimeline from './components/PhaseTimeline'
import PhaseCrossroads from './components/PhaseCrossroads'
import PathReconciliation from './components/PathReconciliation'
import PathGoodbye from './components/PathGoodbye'
import PathUndecided from './components/PathUndecided'
import MuteButton from './components/MuteButton'
import { useAudio } from './hooks/useAudio'

type Phase = 'gate' | 'timeline' | 'fork' | 'pathYes' | 'pathNo' | 'pathUndecided'

export default function App() {
  const [isDestroyed, setIsDestroyed] = useState(false)
  const [phase, setPhase] = useState<Phase>('gate')
  const { play, toggleMute, muted } = useAudio('/audio/raabta.mp3')

  useEffect(() => {
    if (localStorage.getItem('site_destroyed') === 'true') {
      setIsDestroyed(true)
    }
  }, [])

  const go = (next: Phase) => setPhase(next)

  const handleYes = () => {
    play()
    go('timeline')
  }

  // Genuine-looking browser error screen when terminated
  if (isDestroyed) {
    return (
      <div 
        style={{ 
          background: '#0f0f11', 
          color: '#e5e7eb', 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: '2rem' 
        }}
      >
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem', color: '#f3f4f6' }}>
            This site can’t be reached
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            The server at <span style={{ color: '#d1d5db' }}>{window.location.hostname || 'localhost'}</span> took too long to respond.
          </p>
          <hr style={{ border: 'none', borderTop: '1px solid #27272a', marginBottom: '1.25rem' }} />
          <div style={{ fontSize: '0.75rem', color: '#71717a' }}>
            <p>Try:</p>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem', lineHeight: '1.5' }}>
              <li>Checking the connection</li>
              <li>Checking the proxy and the firewall</li>
            </ul>
            <p style={{ marginTop: '1rem', fontFamily: 'monospace' }}>ERR_CONNECTION_TIMED_OUT</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'var(--night)' }}>
      <AnimatePresence mode="wait">
        {phase === 'gate' && (
          <PhaseGatekeeper key="gate" onYes={handleYes} />
        )}
        {phase === 'timeline' && (
          <PhaseTimeline key="timeline" onContinue={() => go('fork')} />
        )}
        {phase === 'fork' && (
          <PhaseCrossroads
            key="fork"
            onChoose={(c) => {
              if (c === 'yes') go('pathYes')
              else if (c === 'no') go('pathNo')
              else if (c === 'dont know') go('pathUndecided')
            }}
          />
        )}
        {phase === 'pathYes' && (
          <PathReconciliation key="pathYes" onRestart={() => go('gate')} />
        )}
        {phase === 'pathNo' && (
          <PathGoodbye key="pathNo" onRestart={() => go('gate')} />
        )}
        {phase === 'pathUndecided' && (
          <PathUndecided key="pathUndecided" onRestart={() => go('gate')} />
        )}
      </AnimatePresence>

      {/* Only show mute button after music has started */}
      {phase !== 'gate' && (
        <MuteButton muted={muted} onToggle={toggleMute} />
      )}
    </div>
  )
}
