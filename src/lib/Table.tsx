import type { Column, Row } from "./types"
import Thead from "./Thead/Thead"
import Tbody from "./Tbody/Tbody"
import Search from "./Search/Search"
import useTable from "./useTable"
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
    setSearchInput,
    noResults,
    hasNextPage,
    hasPreviousPage,
    numberOfPages,
    currentPage,
    setCurrentPage
  } = useTable<T>(rows)

  return (
    <div>
      <Search setSearchInput={setSearchInput} />
      {noResults
        ? <h1>No results found.</h1>
        : (
          <>
            <table>
              <Thead sort={sort} setSort={setSort} columns={columns} />
              <Tbody rowsData={rowsData} columns={columns} />
            </table>
            <p>Page: {currentPage + 1} / {numberOfPages}</p>
            <button disabled={!hasPreviousPage} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button disabled={!hasNextPage} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </>
        )
      }
    </div>
  )
}

export default Table