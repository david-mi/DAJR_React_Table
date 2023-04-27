import type { RowsUniqueIds } from "./useTable"
import type { SortState } from "./useTable"

/**
 * Sort datas based on parameters 
 * 
 * - if {@link sort.type} is equal to "NONE" returns immediately
 * - if {@link sort.type} is equal to "ASC", sort in ascending order
 * - if {@link sort.type} is equal to "DESC", sort in descending order
 */

export function sortData<T extends string>(data: RowsUniqueIds<T>, { column, type }: SortState<T>) {
  const collaborator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true })

  return [...data].sort((a, b) => {
    const [firstValue, secondValue] = type === "ASC"
      ? [a[column as T], b[column as T]]
      : [b[column as T], a[column as T]]

    return collaborator.compare(firstValue, secondValue)
  })
}

/**
 * Filter datas based on parameters
 * 
 * - if {@link searchInput} is included in one of the rows, filters returns true
 * - uniqueId property is being ignored during search
 */

export function filterData<T extends string>(data: RowsUniqueIds<T>, searchInput: string) {
  return data.filter((row) => {
    let key: keyof typeof row

    for (key in row) {
      if (key === "uniqueId") continue

      if (row[key].toLowerCase().indexOf(searchInput) !== -1) {
        return true
      }
    }

    return false
  })
}