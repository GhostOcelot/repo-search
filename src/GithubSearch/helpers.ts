import { SortCriteria, SortOrder } from "./types"

export const sortCriteriaOptions = Object.entries(SortCriteria).map((item) => ({
  label: item[0],
  value: item[1],
}))

export const sortOrderOptions = Object.entries(SortOrder).map((item) => ({
  label: item[0],
  value: item[1],
}))

export const ItemsPerPageOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
]
