import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table"
import GlobalFilter from "./GlobalFilter"

interface Props {
  data: {
    [key: string]: string
  },
  columns: {
    Header: string,
    accessor: string
  }[]
}

function Table({ columns, data }: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    canNextPage,
    canPreviousPage
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const { globalFilter, pageIndex } = state

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={previousPage} disabled={!canPreviousPage}>Previous</button>
      <button onClick={nextPage} disabled={!canNextPage}>Next</button>
      <span>Page {pageIndex + 1} of {pageOptions.length}</span>
    </>
  )
}

export default Table