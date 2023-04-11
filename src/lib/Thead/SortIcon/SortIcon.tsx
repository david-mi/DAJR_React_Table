import type { SortState } from "../../useTable"

interface Props<T> {
  sort: SortState<T>
  /** column accessor */
  accessor: T
}

/**
 * Display ascending or desending sort icon on clicked column head,
 * based on {@link sort} values
 */

function SortIcon<T extends string>({ accessor, sort }: Props<T>) {
  const isColumnSorted = accessor === sort.column


  const icons = {
    ASC: "▲",
    DESC: "▼",
    NONE: null
  }

  return isColumnSorted
    ? <span>{icons[sort.type]}</span>
    : null
}

export default SortIcon