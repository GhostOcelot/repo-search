import { useState } from "react"
import { useFetch, useDebounce } from "../hooks"
import Pagination from "../components/Pagination"
import { RepositoriesData, SortCriteria, SortOrder } from "./types"
import { GITHUB_BASE_URL, INITIAL_SEARCH_QUERY } from "./const"
import RepositoryList from "./RepositoryList"
import Loader from "../Loader"
import CustomSelect from "../components/CustomSelect"
import DebouncedInput from "../components/CustomInput"
import { ItemsPerPageOptions, sortCriteriaOptions, sortOrderOptions } from "./helpers"

const GithubSearch = () => {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(INITIAL_SEARCH_QUERY)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(SortCriteria.stars)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.descending)

  const debouncedValue = useDebounce(query)

  const { data, loading } = useFetch<RepositoriesData>(
    `${GITHUB_BASE_URL}/search/repositories?q=${debouncedValue}&page=${page}&per_page=${itemsPerPage}&sort=${sortCriteria}&order=${sortOrder}`,
  )

  const numberOfPages = data ? Math.ceil(data.total_count / itemsPerPage) : 0

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-2">
        <CustomSelect
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value as SortCriteria)}
          options={sortCriteriaOptions}
          label="sort by"
          name="sort-by"
        />
        <CustomSelect
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          options={sortOrderOptions}
          label="sort order"
          name="sort-order"
        />
        <CustomSelect
          value={itemsPerPage}
          onChange={(e) => {
            setPage(1)
            setItemsPerPage(Number(e.target.value))
          }}
          options={ItemsPerPageOptions}
          label="items"
          name="number-of-items"
        />

        <DebouncedInput
          value={query}
          onChange={(e) => {
            setPage(1)
            setQuery(e.target.value)
          }}
          label="search"
          id="search-phrase"
          delay={1000}
        />
      </div>
      {data && numberOfPages > 1 && (
        <Pagination page={page} numberOfPages={numberOfPages} setPage={setPage} />
      )}
      {loading ? <Loader /> : <RepositoryList data={data} />}
    </div>
  )
}

export default GithubSearch
