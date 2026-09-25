import { motion } from 'framer-motion'

interface Props {
  muted: boolean
  onToggle: () => void
}

export default function MuteButton({ muted, onToggle }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      title={muted ? 'Unmute' : 'Mute'}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.25rem',
        zIndex: 1000,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid rgba(247,238,240,0.15)',
        background: 'rgba(26,16,21,0.7)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
      whileTap={{ scale: 0.92 }}
    >
      {muted ? '🔇' : '🎵'}
    </motion.button>
  )
}