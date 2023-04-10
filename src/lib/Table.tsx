import { useState, useMemo } from "react"
import type { Column, Row } from "./types"

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
      <thead>
        <tr>
          {columns.map(({ title, key }) => {
            return <th key={key}>{title}</th>
          })}
        </tr>
      </thead>

      <tbody>
        {rowsArrayValues.map((dataValue, index) => (
          <tr key={index}>
            {dataValue.map(data => <td key={data}>{data}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table