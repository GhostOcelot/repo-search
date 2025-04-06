import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface TimerState {
  time: number
  isRunning: boolean
  isInitialized: boolean
}

const initialState: TimerState = {
  time: 0,
  isRunning: false,
  isInitialized: false,
}

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    changeTime: (state, action: PayloadAction<number>) => {
      return { ...state, time: action.payload }
    },
    changeIsRunning: (state, action: PayloadAction<boolean>) => {
      return { ...state, isRunning: action.payload }
    },
    changeIsInitialized: (state, action: PayloadAction<boolean>) => {
      return { ...state, isInitialized: action.payload }
    },
  },
})

export const { changeTime, changeIsRunning, changeIsInitialized } = timerSlice.actions
export default timerSlice.reducer
