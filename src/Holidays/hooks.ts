import { useState } from "react"
import { useFetch } from "../hooks"
import { OPEN_HOLIDAY_BASE_URL } from "./const"
import { Country, Holiday } from "./types"

export const useHolidays = () => {
  const [SelectedCountryCode, setSelectedCountryCode] = useState("NL")
  const [SelectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const holidaysUrl = `${OPEN_HOLIDAY_BASE_URL}/PublicHolidays?countryIsoCode=${SelectedCountryCode}&validFrom=${SelectedYear}-01-01&validTo=${SelectedYear}-12-31&languageIsoCode=EN`
  const countriesUrl = `${OPEN_HOLIDAY_BASE_URL}/Countries?languageIsoCode=EN`

  const { data: countries } = useFetch<Country[]>(countriesUrl)
  const {
    data: holidays,
    error: holidaysError,
    fetchData: fetchHolidays,
  } = useFetch<Holiday[]>(holidaysUrl)

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchHolidays()
    setSelectedCountryCode(e.target.value)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchHolidays()
    setSelectedYear(Number(e.target.value))
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
    SelectedCountryCode,
    SelectedYear,
    handleCountryChange,
    handleYearChange,
  }
}
