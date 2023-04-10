import { useState, useMemo } from "react"
import type { Column, Row } from "./types"
import Thead from "./Thead/Thead"
import Tbody from "./Tbody/Tbody"

interface Props<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
}

export type RowsUniqueIds<T extends string> = ({
  /** uuid generated id */
  uuid: string
} & Row<T>)[]

export interface SortState<T> {
  type: "ASC" | "DESC" | "NONE"
  column: keyof T | ""
}

function Table<T extends string>({ columns, rows }: Props<T>) {
  const rowsData = useMemo<RowsUniqueIds<T>>(() => {
    return rows.map((row) => {
      return { ...row, uuid: crypto.randomUUID() }
    })
  }, [])

  const [sort, setSort] = useState<SortState<T>>({
    type: "NONE",
    column: ""
  })

  const dataToShow = sortData()

  function sortData() {
    if (sort.type === "NONE") return rowsData

    return [...rowsData].sort((a, b) => {
      const [firstValue, secondValue] = sort.type === "ASC"
        ? [a[sort.column], b[sort.column]]
        : [b[sort.column], a[sort.column]]

      return typeof firstValue === "string" && typeof secondValue === "string"
        ? firstValue.localeCompare(secondValue, undefined, { sensitivity: "base", numeric: true })
        : (firstValue as number) - (secondValue as number)
    })
  }

  return (
    <table>
      <Thead sort={sort} setSort={setSort} columns={columns} />
      <Tbody rowsData={dataToShow} columns={columns} />
    </table>
  )
}

export default Table