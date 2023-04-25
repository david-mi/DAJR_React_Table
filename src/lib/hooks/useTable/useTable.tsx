import { useState, useMemo, useCallback, useRef } from "react"
import type { Row } from "../../types"
import { getRandomId } from "../../utils"
import usePagination from "../usePagination/usePagination"
import { sortData, filterData } from "./helpers"

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

  const pagination = usePagination(rowsData)
  const previousInput = useRef("")
  const isUnsort = sort.type === "NONE"

  function handleSearch(searchInput: string) {
    const searchValueStartsWithPreviousValue = searchInput.startsWith(previousInput.current)
    previousInput.current = searchInput

    let updatedData: RowsUniqueIds<T>;

    if (searchValueStartsWithPreviousValue) {
      updatedData = filterData(rowsData, searchInput)
    } else {
      updatedData = isUnsort
        ? filterData(initialData, searchInput)
        : sortData(filterData(initialData, searchInput), sort)
    }

    setRowsData(updatedData)
    pagination.updatePaginationStates({ rows: updatedData, newPageIndex: 0 })
    setSearchInput(searchInput)
  }

  function handleSort(sort: SortState<T>) {
    const isUnsort = sort.type === "NONE"

    const updatedData = isUnsort
      ? filterData(initialData, searchInput)
      : sortData(rowsData, sort)

    setRowsData(updatedData)
    pagination.updatePaginationStates({ rows: updatedData, newPageIndex: 0 })
    setSort(sort)
  }

  return {
    rowsData,
    sort,
    handleSort,
    searchInput,
    handleSearch,
    ...pagination
  }
}

export default useTable