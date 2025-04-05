import { useState } from "react"
import { Country, Holiday } from "./types"
import HolidaysList from "./HolidaysList"
import { useFetch } from "../hooks"
import { OPEN_HOLIDAY_BASE_URL } from "./const"
import CustomSelect from "../components/CustomSelect"

const Holidays = () => {
  const [SelectedCountryCode, setSelectedCountryCode] = useState("NL")

  const countriesUrl = `${OPEN_HOLIDAY_BASE_URL}/Countries?languageIsoCode=EN`
  const holidaysUrl = `${OPEN_HOLIDAY_BASE_URL}/PublicHolidays?countryIsoCode=${SelectedCountryCode}&validFrom=2025-01-01&validTo=2025-12-31&languageIsoCode=EN`

  const { data: countries } = useFetch<Country[]>(countriesUrl)
  const { data: holidays, error: holidaysError, fetchData } = useFetch<Holiday[]>(holidaysUrl)

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchData()
    setSelectedCountryCode(e.target.value)
  }

  return (
    <div className="flex-grow w-full max-w-[800px] mx-auto flex flex-col mb-8 px-8">
      <CustomSelect
        value={SelectedCountryCode}
        onChange={handleCountryChange}
        options={
          countries?.map((country) => ({
            value: country.isoCode,
            label: country.name[0].text,
          })) || []
        }
        label="country"
        name="select-country"
        className="w-full"
      />

      <div className="w-auto self-center mt-8">
        {holidaysError ? (
          <h1 className="text-center">{holidaysError}</h1>
        ) : (
          <HolidaysList holidays={holidays} />
        )}
      </div>
    </div>
  )
}

export default Holidays
