import { useState, useEffect } from "react"
import type { ChangeEvent } from "react"
import type { RowsUniqueIds } from "./Table"
import type { SortState } from "./useTable"

function usePagination<T extends string>(
  rows: RowsUniqueIds<T>,
  sort: SortState<T>,
  searchInput: string
) {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [pagesNumber, setPagesNumber] = useState(getNumberOfPages(rows))
  const [hasNextPage, setHasNextPage] = useState(checkIfNextPageExist(rows))
  const [hasPreviousPage, setHasPreviousPage] = useState(false)

  const [paginatedRows, setPaginatedRows] = useState(rows)

  useEffect(() => {
    const dataSliceStart = currentPage * pageSize
    const dataSliceEnd = dataSliceStart + pageSize

    setHasNextPage(checkIfNextPageExist(rows))
    setHasPreviousPage(checkIfPreviousPageExist())
    setPagesNumber(getNumberOfPages(rows))
    setPaginatedRows(rows.slice(dataSliceStart, dataSliceEnd))
  }, [rows, currentPage, pageSize])

  useEffect(() => {
    if (currentPage !== 0) {
      setCurrentPage(0)
    }
  }, [sort, searchInput, pageSize])

  function goToNextPage() {
    setCurrentPage((previousPage) => previousPage + 1)
  }

  function goToPreviousPage() {
    setCurrentPage((previousPage) => previousPage - 1)
  }

  function checkIfNextPageExist(data: RowsUniqueIds<T>) {
    const nextPageStartInData = (currentPage + 1) * pageSize
    return data.length > nextPageStartInData
  }

  function checkIfPreviousPageExist() {
    return currentPage - 1 >= 0
  }

  function updatePageSize({ target }: ChangeEvent) {
    const selectNumberValue = parseInt((target as HTMLSelectElement).value, 10)
    setPageSize(selectNumberValue)
  }

  function getNumberOfPages(data: RowsUniqueIds<T>) {
    return Math.ceil(data.length / pageSize)
  }

  return {
    paginatedData: paginatedRows,
    hasNextPage,
    hasPreviousPage,
    pagesNumber,
    updatePageSize,
    currentPage,
    goToNextPage,
    goToPreviousPage
  }
}

export default usePagination