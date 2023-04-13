import type { Column } from "../types"
import type { Dispatch, SetStateAction, MouseEvent } from "react"
import type { SortState } from "../useTable"
import SortIcon from "./SortIcon/SortIcon"

enum SORT_SWITCH {
  NONE = "ASC",
  ASC = "DESC",
  DESC = "NONE",
}

interface Props<T extends string> {
  columns: Column<T>[]
  sort: SortState<T>
  setSort: Dispatch<SetStateAction<SortState<T>>>
}

function Thead<T extends string>({ columns, setSort, sort }: Props<T>) {

  /**
   * Gets called when clicking on one column head
   * 
   * - Update {@link sort} state
   * - If clicked head column differs from the previous clicked one, set sort type to ascending
   * - else, define sort type based of current sort type and {@link SORT_SWITCH}
   */

  function handleColumnHeadClick({ target }: MouseEvent) {
    const clickedColumnHead = (target as HTMLTableCellElement).dataset.column as keyof T

    setSort(
      clickedColumnHead !== sort.column
        ? { type: "ASC", column: clickedColumnHead }
        : { type: SORT_SWITCH[sort.type], column: clickedColumnHead }
    )
  }

  return (
    <thead>
      <tr>
        {columns.map(({ title, accessor }) => (
          <th
            key={accessor}
            data-column={accessor}
            onClick={handleColumnHeadClick}
            data-testid="thead-th"
          >
            {title}
            <SortIcon sort={sort} accessor={accessor} />
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Thead