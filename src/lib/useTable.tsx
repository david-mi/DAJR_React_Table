import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import type { Row } from "./types"
import { getRandomId } from "./utils"

export interface SortState<T> {
  type: "ASC" | "DESC" | "NONE"
  column: T | ""
}

export type RowsUniqueIds<T extends string> = ({
  /** uniqueId generated id */
  uniqueId: string
} & Row<T>)[]

/**
 * Custom Hook to handle initial rows data, data sorting and data filtering
 */

function useTable<T extends string>(rows: Row<T>[]) {
  /** Initial rows data with added unique id */
  const initialData = useMemo<RowsUniqueIds<T>>(() => {
    return rows.map((row) => {
      return { ...row, uniqueId: getRandomId() }
    })
  }, [])

  const [rowsData, setRowsData] = useState(initialData)
  const [sort, setSort] = useState<SortState<T>>({
    type: "NONE",
    column: ""
  })
  const [searchInput, setSearchInput] = useState("")

  const previousInput = useRef("")
  const firstRender = useRef(true)
  const isUnsort = sort.type === "NONE"

  /**
   * Sort datas based on parameters 
   * 
   * - if {@link sort.type} is equal to "NONE" returns immediately
   * - if {@link sort.type} is equal to "ASC", sort in ascending order
   * - if {@link sort.type} is equal to "DESC", sort in descending order
   */

  const sortData = useCallback((data: RowsUniqueIds<T>) => {
    return [...data].sort((a, b) => {
      const [firstValue, secondValue] = sort.type === "ASC"
        ? [a[sort.column], b[sort.column]]
        : [b[sort.column], a[sort.column]]

      return typeof firstValue === "string" && typeof secondValue === "string"
        ? firstValue.localeCompare(secondValue, undefined, { sensitivity: "base", numeric: true })
        : (firstValue as number) - (secondValue as number)
    })
  }, [sort])

  /**
   * Filter datas based on parameters
   * 
   * - if {@link searchInput} is included in one of the rows, filters returns true
   * - uniqueId property is being ignored during search
   */

  const filterData = useCallback((data: RowsUniqueIds<T>) => {
    return data.filter(({ uniqueId, ...row }) => {
      return Object
        .values<string | number>(row)
        .find((value) => {
          return typeof value === "number"
            ? String(value).includes(searchInput)
            : value.toLowerCase().includes(searchInput)
        })
    })
  }, [searchInput])

  useEffect(() => {
    /** avoid unnecessary data processing on first render */
    if (firstRender.current) return

    setRowsData(
      isUnsort
        ? filterData(initialData)
        : sortData(rowsData)
    )
  }, [sort])

  useEffect(() => {
    /** avoid unnecessary data processing on first render */
    if (firstRender.current) return

    const searchValueStartsWithPreviousValue = searchInput.startsWith(previousInput.current)
    previousInput.current = searchInput

    if (searchValueStartsWithPreviousValue) {
      setRowsData(filterData(rowsData))
    } else {
      setRowsData(
        isUnsort
          ? filterData(initialData)
          : sortData(filterData(initialData))
      )
    }
  }, [searchInput])

  useEffect(() => {
    firstRender.current = false
  }, [])

  return {
    rowsData,
    sort,
    setSort,
    searchInput,
    setSearchInput
  }
}

export default useTable