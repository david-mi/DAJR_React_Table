import type { RowsUniqueIds } from "../../hooks/useTable/useTable"
import type { Row } from "../../types"

interface Props<T extends string> {
  currentPageIndex: number,
  searchInput: string,
  filteredDataLength: number,
  paginationSize: number,
  paginatedData: RowsUniqueIds<T>,
  initialDataLength: number
  className?: string
}

/** Table informations */

function Informations<T extends string>(props: Props<T>) {
  const {
    currentPageIndex,
    searchInput,
    filteredDataLength,
    paginationSize,
    paginatedData,
    initialDataLength,
    className
  } = props

  const paginatedDataLength = paginatedData.length
  const paginationScreenStart = paginatedDataLength
    ? 1 + (currentPageIndex * paginationSize)
    : 0
  const paginationScreenEnd = currentPageIndex * paginationSize + paginatedDataLength
  const formatedInitialDataLength = new Intl.NumberFormat("en-US").format(initialDataLength)
  const formatedFilterLength = new Intl.NumberFormat("en-US").format(filteredDataLength)

  return (
    <div className={className}>
      <span>Showing {paginationScreenStart} to {paginationScreenEnd} of {formatedFilterLength} entries </span>
      {searchInput && <span>(filtered from {formatedInitialDataLength} total entries)</span>}
    </div>
  )
}

export default Informations