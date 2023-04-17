import type { RowsUniqueIds } from "../Table"

interface Props<T> {
  hasNextPage: boolean
  hasPreviousPage: boolean
  currentPage: number,
  pagesNumber: number,
  initialDataLength: string,
  searchInput: string,
  filteredDataLength: string,
  pageSize: number,
  goToNextPage: () => void
  goToPreviousPage: () => void
}

const PageNavigation = (props: Props) => {
  const {
    hasNextPage,
    hasPreviousPage,
    currentPage,
    pagesNumber,
    searchInput,
    filteredDataLength,
    pageSize,
    goToPreviousPage,
    goToNextPage,
    paginatedData,
    initialData
  } = props

  const paginationScreenStart = paginatedData.length > 0
    ? 1 + (currentPage * pageSize)
    : 0

  const paginationScreenEnd = currentPage * pageSize + paginatedData.length
  const initialDataLength = new Intl.NumberFormat("en-US").format(initialData.length)

  return (
    <div>
      <span>Showing {paginationScreenStart} to {paginationScreenEnd} of {filteredDataLength} entries </span>
      {searchInput && <span>(filtered from {initialDataLength} total entries)</span>}
      <button disabled={!hasPreviousPage} onClick={goToPreviousPage}>Previous</button>
      <button disabled={!hasNextPage} onClick={goToNextPage}>Next</button>
    </div>
  )
}

export default PageNavigation