import type { Column, Row } from "./types"
import Thead from "./Thead/Thead"
import Tbody from "./Tbody/Tbody"
import useTable from "./useTable"

export type RowsUniqueIds<T extends string> = ({
  /** uuid generated id */
  uuid: string
} & Row<T>)[]

interface Props<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
}

function Table<T extends string>({ columns, rows }: Props<T>) {
  const { rowsData, sort, setSort } = useTable<T>(rows)

  return (
    <table>
      <Thead sort={sort} setSort={setSort} columns={columns} />
      <Tbody rowsData={rowsData} columns={columns} />
    </table>
  )
}

export default Table