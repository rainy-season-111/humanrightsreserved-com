import { useState, useEffect, useRef } from 'react'
import './App.css'

const SEGMENTS = [
  { text: 'maybe something, ', delay: 80 },
  { text: 'one day.', delay: 80, pauseBefore: 2000 },
]
const FULL_TEXT = SEGMENTS.map(s => s.text).join('')

export default function App() {
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), 2000)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!started || charIndex >= FULL_TEXT.length) return
    let segStart = 0
    let currentDelay = 80
    for (const seg of SEGMENTS) {
      if (charIndex === segStart && seg.pauseBefore) {
        timerRef.current = setTimeout(() => setCharIndex(prev => prev + 1), seg.pauseBefore)
        return () => { if (timerRef.current) clearTimeout(timerRef.current) }
      }
      if (charIndex >= segStart && charIndex < segStart + seg.text.length) {
        currentDelay = seg.delay
        break
      }
      segStart += seg.text.length
    }
    timerRef.current = setTimeout(() => setCharIndex(prev => prev + 1), currentDelay)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [started, charIndex])

  return (
    <div className="page">
      <span className="text">
        {started ? FULL_TEXT.slice(0, charIndex) : ''}
        <span className="cursor" />
      </span>
    </div>
  )
}
