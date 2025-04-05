import { monthsArray } from "../helpers"
import { Holiday } from "./types"

interface Props {
  holidays: Holiday[] | null
}

const HolidaysList = ({ holidays }: Props) => {
  return (
    <ul className="w-full max-w-[600px] my-8">
      <li
        key="header"
        className="font-semibold border-b-1 border-b-amber-200 py-2 pl-2 grid grid-cols-[120px_1fr]"
      >
        <p>date</p>
        <p>holiday</p>
      </li>
      {holidays &&
        holidays.map((holiday) => {
          const name = holiday.name[0].text
          const now = new Date(holiday.startDate)
          const day = now.getDate()
          const month = monthsArray[now.getMonth()]

          return (
            <li
              key={holiday.id}
              className="border-b-1 border-b-amber-200 py-2 pl-2 hover:bg-gray-100 grid grid-cols-[120px_1fr]"
            >
              <p>
                {month} {day}
              </p>
              <p> {name} </p>
            </li>
          )
        })}
    </ul>
  )
}

export default HolidaysList
