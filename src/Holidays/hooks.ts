import { useFetch } from "../hooks"
import { OPEN_HOLIDAY_BASE_URL } from "../const"
import { Country, Holiday } from "./types"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { changeCountry, changeYear } from "../features/holidaysSlice"

export const useHolidays = () => {
  const { countryCode, year } = useSelector((state: RootState) => state.holidays)
  const dispatch = useDispatch<AppDispatch>()

  const holidaysUrl = `${OPEN_HOLIDAY_BASE_URL}/PublicHolidays?countryIsoCode=${countryCode}&validFrom=${year}-01-01&validTo=${year}-12-31&languageIsoCode=EN`
  const countriesUrl = `${OPEN_HOLIDAY_BASE_URL}/Countries?languageIsoCode=EN`

  const { data: countries } = useFetch<Country[]>(countriesUrl)
  const {
    data: holidays,
    error: holidaysError,
    fetchData: fetchHolidays,
  } = useFetch<Holiday[]>(holidaysUrl)

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchHolidays()
    dispatch(changeCountry(e.target.value))
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchHolidays()
    dispatch(changeYear(Number(e.target.value)))
  }

  const countryOptions =
    countries?.map((country) => ({
      value: country.isoCode,
      label: country.name[0].text,
    })) || []

  const yearOptions = Array.from({ length: 2011 - 2000 }, (_, i) => 2020 + i).map((year) => ({
    label: String(year),
    value: year,
  }))

  return {
    holidays,
    holidaysError,
    countryOptions,
    yearOptions,
    countryCode,
    year,
    handleCountryChange,
    handleYearChange,
  }
}
