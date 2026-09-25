import { useRef, useState } from 'react'

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(false)

  const play = () => {
    if (!audioRef.current) {
      const audio = new Audio(src)
      audio.loop = true
      audio.volume = 0.35
      audioRef.current = audio
    }
    audioRef.current.play().catch((err) => console.error('Play error:', err))
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setMuted(prev => !prev)
    }
  }

  return { play, toggleMute, muted }
}