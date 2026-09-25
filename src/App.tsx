import { AnimatePresence } from 'framer-motion'
import PhaseGatekeeper from './components/PhaseGatekeeper'
import PhaseTimeline from './components/PhaseTimeline'
import PhaseCrossroads from './components/PhaseCrossroads'
import PathReconciliation from './components/PathReconciliation'
import PathGoodbye from './components/PathGoodbye'
import { useState } from 'react'

type Phase = 'gate' | 'timeline' | 'fork' | 'pathYes' | 'pathNo'

export default function App() {
  const [phase, setPhase] = useState<Phase>('gate')

  const go = (next: Phase) => setPhase(next)

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'var(--night)' }}>
      <AnimatePresence mode="wait">
        {phase === 'gate' && (
          <PhaseGatekeeper key="gate" onYes={() => go('timeline')} />
        )}
        {phase === 'timeline' && (
          <PhaseTimeline key="timeline" onContinue={() => go('fork')} />
        )}
        {phase === 'fork' && (
          <PhaseCrossroads
            key="fork"
            onChoose={(c) => go(c === 'yes' ? 'pathYes' : 'pathNo')}
          />
        )}
        {phase === 'pathYes' && (
          <PathReconciliation key="pathYes" onRestart={() => go('gate')} />
        )}
        {phase === 'pathNo' && (
          <PathGoodbye key="pathNo" onRestart={() => go('gate')} />
        )}
      </AnimatePresence>
    </div>
  )
}