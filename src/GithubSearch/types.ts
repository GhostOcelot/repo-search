interface Repositories {
  id: number
  name: string
  html_url: string
  stargazers_count: number
}

export interface RepositoriesData {
  items: Repositories[]
  total_count: number
  incompleteResults: boolean
}

export enum SortCriteria {
  "best match" = "best-match",
  stars = "stars",
  forks = "forks",
  "help wanted issues" = "help-wanted-issues",
  updated = "updated",
}

export enum SortOrder {
  ascending = "asc",
  descending = "desc",
}
