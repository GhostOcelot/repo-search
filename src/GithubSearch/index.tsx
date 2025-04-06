import { useFetch, useDebounce } from "../hooks"
import Pagination from "../components/Pagination"
import { RepositoriesData } from "./types"
import { GITHUB_BASE_URL } from "../const"
import RepositoryList from "./RepositoryList"
import Loader from "../components/Loader"
import CustomSelect from "../components/CustomSelect"
import DebouncedInput from "../components/CustomInput"
import { ItemsPerPageOptions, sortCriteriaOptions, sortOrderOptions } from "./helpers"
import NoEntries from "./NoEntries"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import {
  changeSortCriteria,
  changeSortOrder,
  changeItemsPerPage,
  changePage,
  changeQuery,
} from "../features/githubSearchSlice"

const GithubSearch = () => {
  // const [query, setQuery] = useState(INITIAL_SEARCH_QUERY)

  const { sortCriteria, sortOrder, page, itemsPerPage, query } = useSelector(
    (state: RootState) => state.githubSearch,
  )
  const dispatch = useDispatch<AppDispatch>()

  const debouncedValue = useDebounce(query)

  const { data, loading } = useFetch<RepositoriesData>(
    `${GITHUB_BASE_URL}/search/repositories?q=${debouncedValue}&page=${page}&per_page=${itemsPerPage}&sort=${sortCriteria}&order=${sortOrder}`,
  )

  const numberOfPages = data ? Math.ceil(data.total_count / itemsPerPage) : 0

  return (
    <div className="flex-grow flex flex-col items-center px-8 mt-8">
      <div className="flex flex-col gap-2">
        <CustomSelect
          value={sortCriteria}
          onChange={(e) => dispatch(changeSortCriteria(e.target.value))}
          options={sortCriteriaOptions}
          label="sort by"
          name="sort-by"
        />
        <CustomSelect
          value={sortOrder}
          onChange={(e) => dispatch(changeSortOrder(e.target.value))}
          options={sortOrderOptions}
          label="sort order"
          name="sort-order"
        />
        <CustomSelect
          value={itemsPerPage}
          onChange={(e) => {
            dispatch(changePage(Number(e.target.value)))
            dispatch(changeItemsPerPage(Number(e.target.value)))
          }}
          options={ItemsPerPageOptions}
          label="items"
          name="number-of-items"
        />

        <DebouncedInput
          value={query}
          onChange={(e) => {
            dispatch(changePage(1))
            dispatch(changeQuery(e.target.value))
          }}
          label="search"
          id="search-phrase"
        />
      </div>
      {data && numberOfPages > 1 && (
        <Pagination page={page} changePage={changePage} numberOfPages={numberOfPages} />
      )}
      {loading ? <Loader /> : data?.total_count ? <RepositoryList data={data} /> : <NoEntries />}
    </div>
  )
}

export default GithubSearch
