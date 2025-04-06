export interface TimerContext {
  time: number
  isInitialized: boolean
  isRunning: boolean
  start: () => void
  resume: () => void
  pause: () => void
  reset: () => void
}
