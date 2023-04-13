import type { Column } from "../types"
import type { RowsUniqueIds } from "../Table"

interface Props<T extends string> {
  /** Array of rows objects with properties to use on rows */
  rowsData: RowsUniqueIds<T>
  /** Array of columns objects with properties to use to create columns */
  columns: Column<T>[]
}

/** Display each Rows */

function Tbody<T extends string>({ rowsData, columns }: Props<T>) {
  return (
    <tbody>
      {rowsData.map(({ uuid, ...dataValue }) => (
        <tr key={uuid} data-testid="tbody-row">
          {columns.map(({ accessor }) => {
            return (
              <td
                key={accessor}
                data-testid="tbody-cell"
              >
                {dataValue[accessor]}
              </td>
            )
          })}
        </tr>
      ))
      }
    </tbody>
  )
}

export default Tbody