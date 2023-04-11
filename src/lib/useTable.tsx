import { useState, useMemo, useEffect, useCallback } from "react"
import type { RowsUniqueIds } from "./Table"
import type { Row } from "./types"

export interface SortState<T> {
  type: "ASC" | "DESC" | "NONE"
  column: keyof T | ""
}

function useTable<T extends string>(rows: Row<T>[]) {
  const initialData = useMemo<RowsUniqueIds<T>>(() => {
    return rows.map((row) => {
      return { ...row, uuid: crypto.randomUUID() }
    })
  }, [])

  const [rowsData, setRowsData] = useState(initialData)

  const [sort, setSort] = useState<SortState<T>>({
    type: "NONE",
    column: ""
  })

  const sortData = useCallback(() => {
    return function () {
      if (sort.type === "NONE") return initialData

      return [...initialData].sort((a, b) => {
        const [firstValue, secondValue] = sort.type === "ASC"
          ? [a[sort.column], b[sort.column]]
          : [b[sort.column], a[sort.column]]

        return typeof firstValue === "string" && typeof secondValue === "string"
          ? firstValue.localeCompare(secondValue, undefined, { sensitivity: "base", numeric: true })
          : (firstValue as number) - (secondValue as number)
      })
    }
  }, [sort])

  useEffect(() => {
    setRowsData(sortData())
  }, [sort])

  return {
    rowsData,
    sort,
    setSort
  }
}

export default useTable