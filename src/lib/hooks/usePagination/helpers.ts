
/**
 * Checks if next page on pagination is possible, based on
 * current index on {@link data} array and pagination size
 */

export function checkIfNextPageExist(
  data: any[],
  currentIndex: number,
  paginationSize: number
) {
  const nextPageStartInData = (currentIndex + 1) * paginationSize
  return data.length > nextPageStartInData
}

/**
 * Checks if previous page on pagination is possible, based on
 * current index on {@link data} array
 */

export function checkIfPreviousPageExist(currentIndex: number) {
  return currentIndex - 1 >= 0
}

/**
 * Gets number of pages from pagination, based on on {@link data} length
 * and pagination size
 */

export function getNumberOfPages(data: any[], paginationSize: number) {
  return Math.ceil(data.length / paginationSize)
}