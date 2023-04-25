import { useState, useEffect } from "react"
import type { ChangeEvent } from "react"
import type { RowsUniqueIds } from "../useTable/useTable"
import { getNumberOfPages, checkIfNextPageExist, checkIfPreviousPageExist } from "./helpers"

function usePagination<T extends string>(rowsData: RowsUniqueIds<T>) {
  const [paginationSize, setPaginationSize] = useState(25)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [pagesNumber, setPagesNumber] = useState(getNumberOfPages(rowsData, paginationSize))
  const [hasNextPage, setHasNextPage] = useState(checkIfNextPageExist(rowsData, currentPageIndex, paginationSize))
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [paginatedRows, setPaginatedRows] = useState<RowsUniqueIds<T>>([])

  function updatePaginationStates({
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

    setHasNextPage(checkIfNextPageExist(rows, newPageIndex, newPaginationSize))
    setHasPreviousPage(checkIfPreviousPageExist(newPageIndex))
    setPagesNumber(getNumberOfPages(rows, newPaginationSize))
    setPaginatedRows(rows.slice(dataSliceStart, dataSliceEnd))
  }

  function goToNextPage() {
    const nextPageIndex = currentPageIndex + 1
    setCurrentPageIndex(nextPageIndex)
    updatePaginationStates({ newPageIndex: nextPageIndex })
  }

  function goToPreviousPage() {
    const previousPageIndex = currentPageIndex - 1
    setCurrentPageIndex(previousPageIndex)
    updatePaginationStates({ newPageIndex: previousPageIndex })
  }

  function goToPage(pageNumber: number) {
    setCurrentPageIndex(pageNumber)
    updatePaginationStates({ newPageIndex: pageNumber })
  }

  function updatePageSize({ target }: ChangeEvent<HTMLSelectElement>) {
    const selectNumberValue = parseInt(target.value, 10)

    setPaginationSize(selectNumberValue)
    updatePaginationStates({
      newPaginationSize: selectNumberValue,
      newPageIndex: 0
    })
  }

  useEffect(() => {
    updatePaginationStates()
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
    updatePaginationStates
  }
}

export default usePagination