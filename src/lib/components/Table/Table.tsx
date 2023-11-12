import styles from "./table.module.css"
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
import type { ClassNames, Colors } from "../../types"
import useColors from "../../hooks/useColors"

export interface Props<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
  /** You can apply custom css classes to make styling easier */
  classNames?: ClassNames
  colors?: Colors
}

/** Table with options */

function Table<T extends string>({ columns, rows, classNames = {}, colors }: Props<T>) {
  const propsError = useMemo(() => {
    return checkTableProps({ columns, rows, classNames, colors })
  }, [])

  if (propsError) {
    return <PropsError error={propsError.message} />
  }

  useColors(colors)
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
    <div className={`${styles.container} ${classNames.container}`}>
      <PageSelect updatePageSize={updatePageSize} className={`${styles.select} ${classNames.select}`} />
      <Search handleSearch={handleSearch} className={`${styles.search} ${classNames.search}`} />
      <div className={`${styles.tableContainer} ${classNames.tableContainer}`}>
        <table className={`${styles.table} ${classNames.table}`}>
          <Thead sort={sort} handleSort={handleSort} columns={columns} />
          <Tbody rowsData={paginatedData} columns={columns} />
        </table>
      </div>
      <div className={styles.footer}>
        <Informations
          currentPageIndex={currentPageIndex}
          searchInput={searchInput}
          filteredDataLength={rowsData.length}
          paginationSize={paginationSize}
          paginatedData={paginatedData}
          initialDataLength={rows.length}
          className={`${styles.informations} ${classNames.informations}`}
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
            className={`${styles.navigation} ${classNames.navigation}`}
          />
        )}
      </div>
    </div >
  )
}

export default Table