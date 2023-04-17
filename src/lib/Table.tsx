import type { Column, Row } from "./types"
import Thead from "./Thead/Thead"
import Tbody from "./Tbody/Tbody"
import Search from "./Search/Search"
import useTable from "./useTable"
import usePagination from "./usePagination"
import { checkTableProps } from "./PropsError/checkTableProps"
import PropsError from "./PropsError/PropsError"

export type RowsUniqueIds<T extends string> = ({
  /** uuid generated id */
  uuid: string
} & Row<T>)[]

export interface Props<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
}

function Table<T extends string>({ columns, rows }: Props<T>) {
  const propsError = checkTableProps({ columns, rows })
  if (propsError) {
    return <PropsError error={propsError.message} />
  }

  const {
    rowsData,
    sort,
    setSort,
    searchInput,
    setSearchInput,
    noResults
  } = useTable<T>(rows)

  const {
    hasNextPage,
    hasPreviousPage,
    pagesNumber,
    currentPage,
    paginatedData,
    goToNextPage,
    updatePageSize,
    goToPreviousPage
  } = usePagination<T>(rowsData, sort, searchInput)

  return (
    <div>
      <Search setSearchInput={setSearchInput} />
      {noResults
        ? <h1>No results found.</h1>
        : (
          <>
            <select name="pageSize" id="pageSize" onChange={updatePageSize}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <table>
              <Thead sort={sort} setSort={setSort} columns={columns} />
              <Tbody rowsData={paginatedData} columns={columns} />
            </table>
            <p>Page: {currentPage + 1} / {pagesNumber}</p>
            <button disabled={!hasPreviousPage} onClick={goToPreviousPage}>Previous</button>
            <button disabled={!hasNextPage} onClick={goToNextPage}>Next</button>
          </>
        )
      }
    </div>
  )
}

export default Table