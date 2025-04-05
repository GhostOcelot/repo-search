import { handlePageChange } from "../GithubSearch/helpers"

interface Props {
  page: number
  numberOfPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ page, numberOfPages, setPage }: Props) => {
  const getPageNumbers = () => {
    let pages: (string | number)[] = [1]
    if (page > 3) pages.push("...")

    let start = Math.max(2, page - 1)
    let end = Math.min(numberOfPages - 1, page + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < numberOfPages - 1) pages.push("...")
    if (numberOfPages > 1) pages.push(numberOfPages)

    return pages
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        className={`mx-2 hover:text-amber-600`}
        onClick={() => handlePageChange(setPage, numberOfPages, page, "first")}
      >
        first
      </button>
      <button
        className={`mx-2 hover:text-amber-600`}
        onClick={() => handlePageChange(setPage, numberOfPages, page, "previous")}
      >
        previous
      </button>
      {getPageNumbers().map((item, index) =>
        typeof item === "number" ? (
          <button
            key={index}
            className={`mx-2 hover:text-amber-600 ${item === page && "text-amber-600"}`}
            onClick={() => handlePageChange(setPage, numberOfPages, item)}
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
        onClick={() => handlePageChange(setPage, numberOfPages, page, "next")}
      >
        next
      </button>
      <button
        className={`mx-2 hover:text-amber-600`}
        onClick={() => handlePageChange(setPage, numberOfPages, page, "last")}
      >
        last
      </button>
    </div>
  )
}

export default Pagination
