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

  const [sort, setSort] = useState<SortState<T>>({
    type: "NONE",
    column: ""
  })

  /**
   * Sort datas based on parameters 
   * 
   * - if {@link sort.type} is equal to "NONE" returns immediately
   * - if {@link sort.type} is equal to "ASC", sort in ascending order
   * - if {@link sort.type} is equal to "DESC", sort in descending order
   */

  const sortData = useCallback(() => {
    if (sort.type === "NONE") return initialData

    return [...initialData].sort((a, b) => {
      const [firstValue, secondValue] = sort.type === "ASC"
        ? [a[sort.column], b[sort.column]]
        : [b[sort.column], a[sort.column]]

      return typeof firstValue === "string" && typeof secondValue === "string"
        ? firstValue.localeCompare(secondValue, undefined, { sensitivity: "base", numeric: true })
        : (firstValue as number) - (secondValue as number)
    })
  }, [sort])

  const rowsData = sortData()

  return {
    rowsData,
    sort,
    setSort
  }
}

export default useTable