import { AppDispatch, RootState } from "../store"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeTime, changeIsRunning, changeIsInitialized } from "../features/timerSlice"

type UseTimerOptions = {
  interval?: number
  autoStart?: boolean
  countdown?: boolean
  initialTime?: number
}

export const useTimer = ({
  interval = 1000,
  autoStart = false,
  countdown = false,
  initialTime = 0,
}: UseTimerOptions = {}) => {
  const { time, isRunning, isInitialized } = useSelector((state: RootState) => state.timer)
  const dispatch = useDispatch<AppDispatch>()

  const startTimeRef = useRef<number | null>(null)
  const pauseTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)

  const updateTime = () => {
    if (startTimeRef.current === null) return
    const now = Date.now()
    const elapsed = Math.floor((now - startTimeRef.current) / interval)

    const updatedTime = countdown ? Math.max(initialTime - elapsed, 0) : initialTime + elapsed

    dispatch(changeTime(updatedTime))
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
    dispatch(changeIsRunning(true))
    dispatch(changeIsInitialized(true))
    startInterval()
  }

  const pause = () => {
    if (!isRunning) return
    clearTimer()
    pauseTimeRef.current = Date.now()
    dispatch(changeIsRunning(false))
  }

  const resume = () => {
    if (isRunning || pauseTimeRef.current === null) return

    const pauseDuration = Date.now() - pauseTimeRef.current
    if (startTimeRef.current !== null) {
      startTimeRef.current += pauseDuration
    }

    pauseTimeRef.current = null
    dispatch(changeIsRunning(true))
    startInterval()
  }

  const reset = () => {
    clearTimer()
    dispatch(changeTime(initialTime))
    startTimeRef.current = Date.now()
    pauseTimeRef.current = null
    if (autoStart) {
      dispatch(changeIsRunning(true))
      startInterval()
    } else {
      dispatch(changeIsRunning(false))
      dispatch(changeIsInitialized(false))
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
