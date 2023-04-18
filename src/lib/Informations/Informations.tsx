import type { RowsUniqueIds } from "../useTable"
import type { Row } from "../types"

interface Props<T extends string> {
  currentPageIndex: number,
  searchInput: string,
  filteredDataLength: number,
  paginationSize: number,
  paginatedData: RowsUniqueIds<T>,
  initialData: Row<T>[]
}

function Informations<T extends string>(props: Props<T>) {
  const {
    currentPageIndex,
    searchInput,
    filteredDataLength,
    paginationSize,
    paginatedData,
    initialData,
  } = props

  const paginatedDataLength = paginatedData.length
  const paginationScreenStart = paginatedDataLength
    ? 1 + (currentPageIndex * paginationSize)
    : 0
  const paginationScreenEnd = currentPageIndex * paginationSize + paginatedDataLength
  const initialDataLength = new Intl.NumberFormat("en-US").format(initialData.length)

  return (
    <div>
      <span>Showing {paginationScreenStart} to {paginationScreenEnd} of {filteredDataLength} entries </span>
      {searchInput && <span>(filtered from {initialDataLength} total entries)</span>}
    </div>
  )
}

export default Informations