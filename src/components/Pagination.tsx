import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { changePage } from "../features/githubSearchSlice"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

interface Props {
  page: number
  changePage: ActionCreatorWithPayload<number, "github-search/changePage">
  numberOfPages: number
}

const Pagination = ({ page, numberOfPages }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const getPageNumbers = () => {
    const pages: (string | number)[] = [1]
    if (page > 3) pages.push("...")

    const start = Math.max(2, page - 1)
    const end = Math.min(numberOfPages - 1, page + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < numberOfPages - 1) pages.push("...")
    if (numberOfPages > 1) pages.push(numberOfPages)

    return pages
  }

  return (
    <div className="flex justify-center mt-8">
      <button className={`mx-2 hover:text-amber-600`} onClick={() => dispatch(changePage(1))}>
        first
      </button>
      <button
        className={`mx-2 hover:text-amber-600`}
        onClick={() => dispatch(changePage(page - 1))}
      >
        previous
      </button>
      {getPageNumbers().map((item, index) =>
        typeof item === "number" ? (
          <button
            key={index}
            className={`mx-2 hover:text-amber-600 ${item === page && "text-amber-600"}`}
            onClick={() => dispatch(changePage(item))}
          >
            {item}
          </button>
        ) : (
          <span key={index} className="mx-2">
            ...
          </span>
        ),
      )}
      <button
        className={`mx-2 hover:text-amber-600`}
        onClick={() => dispatch(changePage(page + 1))}
      >
        next
      </button>
      <button
        className={`mx-2 hover:text-amber-600`}
        onClick={() => dispatch(changePage(numberOfPages))}
      >
        last
      </button>
    </div>
  )
}

export default Pagination
