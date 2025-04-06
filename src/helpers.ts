import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const mergeClasses = (...classes: string[]) => {
  return twMerge(clsx(...classes))
}
