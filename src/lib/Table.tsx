import type { Column, Row } from "./types"
import Thead from "./Thead/Thead"
import Tbody from "./Tbody/Tbody"
import Search from "./Search/Search"
import useTable from "./useTable"
import usePagination from "./usePagination"
import { checkTableProps } from "./PropsError/checkTableProps"
import PropsError from "./PropsError/PropsError"
import PageSelect from "./PageSelect/PageSelect"
import PageNavigation from "./PageNavigation/PageNavigation"

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
    noResults,
    filteredDataLength
  } = useTable<T>(rows)

  const {
    updatePageSize,
    paginatedData,
    ...pageNavigation
  } = usePagination<T>(rowsData, sort, searchInput)

  return (
    <div>
      <PageSelect updatePageSize={updatePageSize} />
      <Search setSearchInput={setSearchInput} />
      {noResults
        ? <h1>No results found.</h1>
        : (
          <table>
            <Thead sort={sort} setSort={setSort} columns={columns} />
            <Tbody rowsData={paginatedData} columns={columns} />
          </table>
        )
      }
      <PageNavigation
        {...pageNavigation}
        initialData={rows}
        paginatedData={paginatedData}
        searchInput={searchInput}
        filteredDataLength={filteredDataLength}
      />
    </div>
  )
}

export default Table