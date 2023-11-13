import { useState, useEffect } from "react"
import type { ChangeEvent } from "react"
import type { RowsUniqueIds } from "../useTable/useTable"
import { getNumberOfPages, checkIfNextPageExist, checkIfPreviousPageExist } from "./helpers"

function usePagination<T extends string>(rowsData: RowsUniqueIds<T>) {
  const [paginationSize, setPaginationSize] = useState(10)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [pagesNumber, setPagesNumber] = useState(getNumberOfPages(rowsData, paginationSize))
  const [hasNextPage, setHasNextPage] = useState(checkIfNextPageExist(rowsData, currentPageIndex, paginationSize))
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [paginatedRows, setPaginatedRows] = useState<RowsUniqueIds<T>>(rowsData.slice(0, 10))

  /** Wrapper function to update pagination states */

  function updatePagination({
    rows = rowsData,
    newPageIndex = currentPageIndex,
    newPaginationSize = paginationSize
  }: {
    rows?: RowsUniqueIds<T>,
    newPageIndex?: number,
    newPaginationSize?: number
  } = {}) {
    const dataSliceStart = newPageIndex * newPaginationSize
    const dataSliceEnd = dataSliceStart + newPaginationSize

    setCurrentPageIndex(newPageIndex)
    setHasNextPage(checkIfNextPageExist(rows, newPageIndex, newPaginationSize))
    setHasPreviousPage(checkIfPreviousPageExist(newPageIndex))
    setPagesNumber(getNumberOfPages(rows, newPaginationSize))
    setPaginatedRows(rows.slice(dataSliceStart, dataSliceEnd))
  }

  function goToNextPage() {
    const nextPageIndex = currentPageIndex + 1
    setCurrentPageIndex(nextPageIndex)
    updatePagination({ newPageIndex: nextPageIndex })
  }

  function goToPreviousPage() {
    const previousPageIndex = currentPageIndex - 1
    setCurrentPageIndex(previousPageIndex)
    updatePagination({ newPageIndex: previousPageIndex })
  }

  function goToPage(pageNumber: number) {
    setCurrentPageIndex(pageNumber)
    updatePagination({ newPageIndex: pageNumber })
  }

  function updatePageSize({ target }: ChangeEvent<HTMLSelectElement>) {
    const selectNumberValue = parseInt(target.value, 10)

    setPaginationSize(selectNumberValue)
    updatePagination({
      newPaginationSize: selectNumberValue,
      newPageIndex: 0
    })
  }

  useEffect(() => {
    updatePagination()
  }, [])

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
    goToPage,
    updatePagination
  }
}

export default usePagination