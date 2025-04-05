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

export const handlePageChange = (
  setPage: React.Dispatch<React.SetStateAction<number>>,
  numberOfPages: number,
  page: number,
  type?: string,
) => {
  switch (type) {
    case "first":
      setPage(1)
      break
    case "last":
      setPage(numberOfPages)
      break
    case "previous":
      page > 1 && setPage(page - 1)
      break
    case "next":
      page < numberOfPages && setPage(page + 1)
      break
    default:
      setPage(page)
      break
  }

  return { handlePageChange }
}
