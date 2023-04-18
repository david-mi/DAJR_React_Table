import { useState, useEffect } from "react"
import type { ChangeEvent } from "react"
import type { RowsUniqueIds } from "./Table"
import type { SortState } from "./useTable"

function usePagination<T extends string>(
  rows: RowsUniqueIds<T>,
  sort: SortState<T>,
  searchInput: string
) {
  const [paginationSize, setPaginationSize] = useState(25)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [pagesNumber, setPagesNumber] = useState(getNumberOfPages(rows))
  const [hasNextPage, setHasNextPage] = useState(checkIfNextPageExist(rows))
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [paginatedRows, setPaginatedRows] = useState(rows)

  useEffect(() => {
    const dataSliceStart = currentPageIndex * paginationSize
    const dataSliceEnd = dataSliceStart + paginationSize
    setHasNextPage(checkIfNextPageExist(rows))
    setHasPreviousPage(checkIfPreviousPageExist())
    setPagesNumber(getNumberOfPages(rows))
    setPaginatedRows(rows.slice(dataSliceStart, dataSliceEnd))
  }, [rows, currentPageIndex, paginationSize])

  useEffect(() => {
    if (currentPageIndex !== 0) {
      setCurrentPageIndex(0)
    }
  }, [sort, searchInput, paginationSize])

  function goToNextPage() {
    setCurrentPageIndex((previousPage) => previousPage + 1)
  }

  function goToPreviousPage() {
    setCurrentPageIndex((previousPage) => previousPage - 1)
  }

  function goToPage(pageNumber: number) {
    setCurrentPageIndex(pageNumber)
  }

  function checkIfNextPageExist(data: RowsUniqueIds<T>) {
    const nextPageStartInData = (currentPageIndex + 1) * paginationSize
    return data.length > nextPageStartInData
  }

  function checkIfPreviousPageExist() {
    return currentPageIndex - 1 >= 0
  }

  function updatePageSize({ target }: ChangeEvent) {
    const selectNumberValue = parseInt((target as HTMLSelectElement).value, 10)
    setPaginationSize(selectNumberValue)
  }

  function getNumberOfPages(data: RowsUniqueIds<T>) {
    return Math.ceil(data.length / paginationSize)
  }

  return {
    paginatedData: paginatedRows,
    pagesNumber,
    paginationSize,
    updatePageSize,
    currentPageIndex,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage
  }
}

export default usePagination