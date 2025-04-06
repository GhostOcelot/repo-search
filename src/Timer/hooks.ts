import { useEffect, useRef, useState } from "react"

type UseTimerOptions = {
  interval?: number
  autoStart?: boolean
  countdown?: boolean
  initialTime?: number
}

export const useTimer = ({
  interval = 1000,
  autoStart = true,
  countdown = false,
  initialTime = 0,
}: UseTimerOptions = {}) => {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(autoStart)
  const [isInitialized, setIsInitialized] = useState(autoStart)

  const startTimeRef = useRef<number | null>(null)
  const pauseTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)

  const updateTime = () => {
    if (startTimeRef.current === null) return
    const now = Date.now()
    const elapsed = Math.floor((now - startTimeRef.current) / interval)

    const updatedTime = countdown ? Math.max(initialTime - elapsed, 0) : initialTime + elapsed

    setTime(updatedTime)
  }

  const startInterval = () => {
    clearTimer()
    updateTime()
    intervalRef.current = window.setInterval(updateTime, interval)
  }

  const clearTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const start = () => {
    if (isRunning) return
    startTimeRef.current = Date.now()
    pauseTimeRef.current = null
    setIsRunning(true)
    setIsInitialized(true)
    startInterval()
  }

  const pause = () => {
    if (!isRunning) return
    clearTimer()
    pauseTimeRef.current = Date.now()
    setIsRunning(false)
  }

  const resume = () => {
    if (isRunning || pauseTimeRef.current === null) return

    const pauseDuration = Date.now() - pauseTimeRef.current
    if (startTimeRef.current !== null) {
      startTimeRef.current += pauseDuration
    }

    pauseTimeRef.current = null
    setIsRunning(true)
    startInterval()
  }

  const reset = () => {
    clearTimer()
    setTime(initialTime)
    startTimeRef.current = Date.now()
    pauseTimeRef.current = null
    if (autoStart) {
      setIsRunning(true)
      startInterval()
    } else {
      setIsRunning(false)
      setIsInitialized(false)
    }
  }

  useEffect(() => {
    if (autoStart) {
      startTimeRef.current = Date.now()
      startInterval()
    }

    return () => clearTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    time,
    isInitialized,
    isRunning,
    start,
    pause,
    resume,
    reset,
  }
}
