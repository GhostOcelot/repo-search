import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface HolidayState {
  countryCode: string
  year: number
}

const initialState: HolidayState = { countryCode: "NL", year: 2025 }

const holidaysSlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    changeCountry: (state, action: PayloadAction<string>) => {
      return { ...state, countryCode: action.payload }
    },
    changeYear: (state, action: PayloadAction<number>) => {
      return { ...state, year: action.payload }
    },
  },
})

export const { changeCountry, changeYear } = holidaysSlice.actions
export default holidaysSlice.reducer
