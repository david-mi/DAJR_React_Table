import { useMemo } from "react"
import type { Column, Row } from "../../types"
import { checkTableProps } from "../PropsError/checkTableProps"
import PropsError from "../PropsError/PropsError"
import PageSelect from "../PageSelect/PageSelect"
import Search from "../Search/Search"
import Thead from "../Thead/Thead"
import Tbody from "../Tbody/Tbody"
import Informations from "../Informations/Informations"
import PageNavigation from "../PageNavigation/PageNavigation"
import useTable from "../../hooks/useTable/useTable"

export interface Props<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
  classNames?: {
    container?: string
    tableContainer?: string
    table?: string
    select?: string
    search?: string
    informations?: string
    navigation?: string
  }
}

/** Table with options */

function Table<T extends string>({ columns, rows, classNames = {} }: Props<T>) {
  const propsError = useMemo(() => {
    return checkTableProps({ columns, rows, classNames })
  }, [])

  if (propsError) {
    return <PropsError error={propsError.message} />
  }

  const {
    rowsData,
    sort,
    handleSort,
    searchInput,
    handleSearch,
    paginatedData,
    updatePageSize,
    paginationSize,
    pagesNumber,
    currentPageIndex,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage
  } = useTable<T>(rows)

  const hasMultiplePages = pagesNumber > 1

  return (
    <div className={classNames.container}>
      <PageSelect updatePageSize={updatePageSize} className={classNames.select} />
      <Search handleSearch={handleSearch} className={classNames.search} />
      <div className={classNames.tableContainer}>
        <table className={classNames.table}>
          <Thead sort={sort} handleSort={handleSort} columns={columns} />
          <Tbody rowsData={paginatedData} columns={columns} />
        </table>
      </div>
      <Informations
        currentPageIndex={currentPageIndex}
        searchInput={searchInput}
        filteredDataLength={rowsData.length}
        paginationSize={paginationSize}
        paginatedData={paginatedData}
        initialDataLength={rows.length}
        className={classNames.informations}
      />
      {hasMultiplePages && (
        <PageNavigation
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          goToPage={goToPage}
          currentPageIndex={currentPageIndex}
          pagesNumber={pagesNumber}
          className={classNames.navigation}
        />
      )}
    </div>
  )
}

export default Table