import type { SortState } from "../../../Table"

interface Props<T> {
  sort: SortState<T>
  accessor: T
}

function SortIcon<T extends string>({ accessor, sort, }: Props<T>) {
  const icons = {
    ASC: "▲",
    DESC: "▼",
    NONE: null
  }
  if (accessor !== sort.column) return null

  return (
    <span>{icons[sort.type]}</span>
  )
}

export default SortIcon