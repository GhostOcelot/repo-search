import HolidaysList from "./HolidaysList"
import CustomSelect from "../components/CustomSelect"
import { useHolidays } from "./hooks"

const Holidays = () => {
  const {
    holidays,
    holidaysError,
    countryOptions,
    yearOptions,
    SelectedCountryCode,
    SelectedYear,
    handleCountryChange,
    handleYearChange,
  } = useHolidays()

  return (
    <div className="flex-grow w-full mx-auto flex flex-col items-center mb-8 px-8 mt-8 gap-2">
      <CustomSelect
        value={SelectedCountryCode}
        onChange={handleCountryChange}
        options={countryOptions}
        label="country"
        name="select-country"
      />

      <CustomSelect
        value={SelectedYear}
        onChange={handleYearChange}
        options={yearOptions}
        label="year"
        name="year"
      />

      {holidaysError ? (
        <h1 className="text-center">{holidaysError}</h1>
      ) : (
        <HolidaysList holidays={holidays} />
      )}
    </div>
  )
}

export default Holidays
