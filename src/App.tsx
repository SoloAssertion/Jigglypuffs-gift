import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
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
  const [phase, setPhase] = useState<Phase>('gate')
  const { play, toggleMute, muted } = useAudio('/audio/raabta.mp3')

  const go = (next: Phase) => setPhase(next)

  const handleYes = () => {
    play()
    go('timeline')
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
