import { useState, useMemo } from "react"
import type { Column, Row } from "./types"
import Thead from "./Thead/Thead"
import Tbody from "./Tbody/Tbody"

interface Props<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
}

function Table<T extends string>({ columns, rows }: Props<T>) {
  const [rowsData, setRowsData] = useState<Row<T>[]>(rows)
  const rowsArrayValues = useMemo<T[][]>(() => {
    return rowsData.map(Object.values)
  }, [rowsData])

  return (
    <table>
      <Thead columns={columns} setRowsData={setRowsData} />
      <Tbody rowsArrayValues={rowsArrayValues} />
    </table>
  )
}

export default Table