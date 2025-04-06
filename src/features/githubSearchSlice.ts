import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SortCriteria, SortOrder } from "../GithubSearch/types"
import { INITIAL_SEARCH_QUERY } from "../const"

interface GithubSearchState {
  query: string
  sortCriteria: SortCriteria
  sortOrder: SortOrder
  page: number
  itemsPerPage: number
}

const initialState: GithubSearchState = {
  query: INITIAL_SEARCH_QUERY,
  sortCriteria: SortCriteria.stars,
  sortOrder: SortOrder.descending,
  page: 1,
  itemsPerPage: 5,
}

const githubSearchSlice = createSlice({
  name: "github-search",
  initialState,
  reducers: {
    changeSortCriteria: (state, action: PayloadAction<string>) => {
      return { ...state, sortCriteria: action.payload as SortCriteria }
    },
    changeSortOrder: (state, action: PayloadAction<string>) => {
      return { ...state, sortOrder: action.payload as SortOrder }
    },
    changePage: (state, action: PayloadAction<number>) => {
      return { ...state, page: action.payload }
    },
    changeItemsPerPage: (state, action: PayloadAction<number>) => {
      return { ...state, itemsPerPage: action.payload }
    },
    changeQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload }
    },
  },
})

export const { changeSortCriteria, changeSortOrder, changeItemsPerPage, changePage, changeQuery } =
  githubSearchSlice.actions
export default githubSearchSlice.reducer
