import type { Column } from "../types"
import type { RowsUniqueIds } from "../useTable"

interface Props<T extends string> {
  /** Array of rows objects with properties to use on rows */
  rowsData: RowsUniqueIds<T>
  /** Array of columns objects with properties to use to create columns */
  columns: Column<T>[]
}

/** Display each Rows */

function Tbody<T extends string>({ rowsData, columns }: Props<T>) {
  const hasData = rowsData.length > 0

  return (
    <tbody>
      {hasData
        ? rowsData.map(({ uuid, ...dataValue }) => (
          <tr key={uuid} data-testid="tbody-row">
            {columns.map(({ accessor }) => {
              return (
                <td key={accessor} data-testid="tbody-cell">
                  {dataValue[accessor]}
                </td>
              )
            })}
          </tr>
        ))
        : <tr><td colSpan={columns.length}>No data found</td></tr>
      }
    </tbody>
  )
}

export default Tbody