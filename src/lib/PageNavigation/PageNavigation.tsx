import type { RowsUniqueIds } from "../Table"
import type { Row } from "../types"
import Buttons from "./Buttons/Buttons"

interface Props<T extends string> {
  hasPreviousPage: boolean
  hasNextPage: boolean
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToPage: (pageNumber: number) => void
  currentPageIndex: number,
  pagesNumber: number,
  searchInput: string,
  filteredDataLength: number,
  paginationSize: number,
  initialData: Row<T>[]
  paginatedData: RowsUniqueIds<T>,
}

function PageNavigation<T extends string>(props: Props<T>) {
  const {
    currentPageIndex,
    searchInput,
    filteredDataLength,
    paginationSize,
    paginatedData,
    initialData,
    ...buttonsProps
  } = props

  const paginatedDataLength = paginatedData.length
  const hasPaginatedData = paginatedDataLength > 0

  const paginationScreenStart = paginatedDataLength
    ? 1 + (currentPageIndex * paginationSize)
    : 0

  const paginationScreenEnd = currentPageIndex * paginationSize + paginatedDataLength
  const initialDataLength = new Intl.NumberFormat("en-US").format(initialData.length)

  return (
    <div>
      <span>Showing {paginationScreenStart} to {paginationScreenEnd} of {filteredDataLength} entries </span>
      {searchInput && <span>(filtered from {initialDataLength} total entries)</span>}
      {hasPaginatedData && (
        <Buttons {...buttonsProps} currentPageIndex={currentPageIndex} />
      )}
    </div>
  )
}

export default PageNavigation