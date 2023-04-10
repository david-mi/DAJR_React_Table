import type { Column, Row } from "../types"
import type { Dispatch, SetStateAction } from "react"

interface Props<T extends string> {
  columns: Column<T>[]
  setRowsData: Dispatch<SetStateAction<Row<T>[]>>
}

function Thead<T extends string>({ columns, setRowsData }: Props<T>) {
  return (
    <thead>
      <tr>
        {columns.map(({ title, key }) => {
          return <th key={key}>{title}</th>
        })}
      </tr>
    </thead>
  )
}

export default Thead