import { configureStore } from "@reduxjs/toolkit"
import holidaysReducer from "./features/holidaysSlice"
import githubSearchReducer from "./features/githubSearchSlice"
import timerReducer from "./features/timerSlice"

export const store = configureStore({
  reducer: {
    holidays: holidaysReducer,
    githubSearch: githubSearchReducer,
    timer: timerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
