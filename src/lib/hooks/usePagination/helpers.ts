import type { RowsUniqueIds } from "../useTable/useTable"

export function checkIfNextPageExist<T extends string>(data: RowsUniqueIds<T>, currentPageIndex: number, paginationSize: number) {
  const nextPageStartInData = (currentPageIndex + 1) * paginationSize
  return data.length > nextPageStartInData
}

export function checkIfPreviousPageExist(currentPageIndex: number) {
  return currentPageIndex - 1 >= 0
}

export function getNumberOfPages<T extends string>(data: RowsUniqueIds<T>, paginationSize: number) {
  return Math.ceil(data.length / paginationSize)
}