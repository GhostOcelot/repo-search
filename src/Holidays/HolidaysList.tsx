import { monthsArray } from "../helpers"
import { Holiday } from "./types"

interface Props {
  holidays: Holiday[] | null
}

const HolidaysList = ({ holidays }: Props) => {
  return (
    holidays &&
    holidays.map((holiday) => {
      const name = holiday.name[0].text
      const now = new Date(holiday.startDate)
      const day = now.getDate()
      const month = monthsArray[now.getMonth()]

      return (
        <div key={holiday.id}>
          {month} {day} - <span className="font-bold italic">{name}</span>
        </div>
      )
    })
  )
}

export default HolidaysList
