import { useEffect, useRef, useState } from 'react'

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.35
    audio.preload = 'auto'
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setReady(true))

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setMuted(prev => !prev)
    }
  }

  return { play, toggleMute, muted, ready }
}