import { useState, useEffect, useRef } from 'react'
import './App.css'

const TEXT = 'maybe something, one day.'
const CHAR_DELAY = 55

export default function App() {
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), 2000)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!started || charIndex >= TEXT.length) return
    timerRef.current = setTimeout(() => {
      setCharIndex(prev => prev + 1)
    }, CHAR_DELAY)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [started, charIndex])

  return (
    <div className="page">
      <span className="text">
        {started ? TEXT.slice(0, charIndex) : ''}
        <span className="cursor" />
      </span>
    </div>
  )
}
