import type { RowsUniqueIds } from "./useTable"
import type { SortState } from "./useTable"

/**
 * Sort datas based on parameters 
 * 
 * - if {@link sort.type} is equal to "NONE" returns immediately
 * - if {@link sort.type} is equal to "ASC", sort in ascending order
 * - if {@link sort.type} is equal to "DESC", sort in descending order
 */

export function sortData<T extends string>(data: RowsUniqueIds<T>, sort: SortState<T>) {
  return [...data].sort((a, b) => {
    const [firstValue, secondValue] = sort.type === "ASC"
      ? [a[sort.column], b[sort.column]]
      : [b[sort.column], a[sort.column]]

    return typeof firstValue === "string" && typeof secondValue === "string"
      ? firstValue.localeCompare(secondValue, undefined, { sensitivity: "base", numeric: true })
      : (firstValue as number) - (secondValue as number)
  })
}

/**
 * Filter datas based on parameters
 * 
 * - if {@link searchInput} is included in one of the rows, filters returns true
 * - uniqueId property is being ignored during search
 */

export function filterData<T extends string>(data: RowsUniqueIds<T>, searchInput: string) {
  return data.filter(({ uniqueId, ...row }) => {
    return Object
      .values<string | number>(row)
      .find((value) => {
        return typeof value === "number"
          ? String(value).includes(searchInput)
          : value.toLowerCase().includes(searchInput)
      })
  })
}