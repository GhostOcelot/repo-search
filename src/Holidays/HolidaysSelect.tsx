import { Country } from "./types"

interface Props {
  countries: Country[] | null
  SelectedCountryCode: string
  handleCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const HolidaysSelect = ({ countries, SelectedCountryCode, handleCountryChange }: Props) => {
  return (
    <select
      onChange={handleCountryChange}
      value={SelectedCountryCode}
      name="select-country"
      id="select-country"
      className="w-full px-2 py-1 border-1 border-gray-300 rounded-md bg-gray-100 mb-2"
    >
      {countries &&
        countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name[0].text}
          </option>
        ))}
    </select>
  )
}

export default HolidaysSelect
