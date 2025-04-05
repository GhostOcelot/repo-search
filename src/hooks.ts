import { useState, useCallback, useEffect } from "react"
import { INITIAL_SEARCH_QUERY } from "./GithubSearch/const"

export const useFetch = <T>(url: string, autoFetch: boolean = true) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

      const result: T = await response.json()
      setData(result)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (autoFetch) fetchData()
  }, [fetchData, autoFetch])

  return { data, loading, error, fetchData }
}

export const useDebounce = (value: string, delay = 700) => {
  const [debouncedValue, setDebouncedValue] = useState(INITIAL_SEARCH_QUERY)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value])

  return debouncedValue
}
