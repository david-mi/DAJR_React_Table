import type { Column, Row } from "./types"

interface Props<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
}

function Table<T extends string>({ columns, rows }: Props<T>) {
  return (
    <div>Table</div>
  )
}

export default Table