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
  const icons = {
    ASC: "▲",
    DESC: "▼",
    NONE: null
  }

  /** Tells if the parameter icon is active */

  function isIconActive(icon: string | null): boolean {
    const isSortingColumn = accessor === sort.column
    const isIconMatchingSortType = icons[sort.type] === icon
    return isSortingColumn && isIconMatchingSortType
  }

  return (
    <div>
      <div data-testid="thead-icon-asc" data-active={isIconActive(icons.ASC)}>
        {icons.ASC}
      </div>
      <div data-testid="thead-icon-asc" data-active={isIconActive(icons.DESC)}>
        {icons.DESC}
      </div>
    </div>
  )
}

export default SortIcon