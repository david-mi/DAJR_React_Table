import { useState, useMemo, useCallback, useReducer } from "react"
import type { RowsUniqueIds } from "./Table"
import type { Row } from "./types"
import { getRandomId } from "./utils"

export interface SortState<T> {
  type: "ASC" | "DESC" | "NONE"
  column: keyof T | ""
}

function useTable<T extends string>(rows: Row<T>[]) {
  const initialData = useMemo<RowsUniqueIds<T>>(() => {
    return rows.map((row) => {
      return { ...row, uuid: getRandomId() }
    })
  }, [])

  const [sort, setSort] = useState<SortState<T>>({
    type: "NONE",
    column: ""
  })
  const [searchInput, setSearchInput] = useState("")

  const [pageSize, setPageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(checkIfNextPageExist(initialData))
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [numberOfPages, setNumberOfPages] = useState(getNumberOfPages(initialData))

  const paginateData = useCallback((data: RowsUniqueIds<T>) => {
    const dataSliceStart = currentPage * pageSize
    const dataSliceEnd = dataSliceStart + pageSize
    console.log(dataSliceEnd)

    setHasNextPage(checkIfNextPageExist(data))
    setHasPreviousPage(checkIfPreviousPageExist())
    setNumberOfPages(getNumberOfPages(data))

    return data.slice(dataSliceStart, dataSliceEnd)
  }, [currentPage])

  function checkIfNextPageExist(data: RowsUniqueIds<T>) {
    const nextPageStartInData = (currentPage + 1) * pageSize
    return data.length > nextPageStartInData
  }

  function checkIfPreviousPageExist() {
    return currentPage - 1 >= 0
  }

  function getNumberOfPages(data) {
    return Math.ceil(data.length / pageSize)
  }

  /**
   * Sort datas based on parameters 
   * 
   * - if {@link sort.type} is equal to "NONE" returns immediately
   * - if {@link sort.type} is equal to "ASC", sort in ascending order
   * - if {@link sort.type} is equal to "DESC", sort in descending order
   */

  const sortData = useCallback((data: RowsUniqueIds<T>) => {
    if (sort.type === "NONE") return data

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
   * - uuid property is being ignored during search
   */

  const filterData = useCallback((data: RowsUniqueIds<T>) => {
    return data.filter(({ uuid, ...row }) => {
      return Object
        .values<string | number>(row)
        .find((value) => {
          return typeof value === "number"
            ? String(value).includes(searchInput)
            : value.toLowerCase().includes(searchInput)
        })
    })
  }, [searchInput])


  const rowsData = useMemo(() => {
    return paginateData(filterData(sortData(initialData)))
  }, [sort, searchInput, currentPage])

  return {
    rowsData,
    sort,
    setSort,
    searchInput,
    setSearchInput,
    noResults: rowsData.length === 0,
    hasNextPage,
    hasPreviousPage,
    numberOfPages,
    currentPage,
    setCurrentPage
  }
}

export default useTable