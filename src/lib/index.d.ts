export interface Column<T> {
  title: string,
  /** a property from Row */
  accessor: T
}

export type Row<T extends string> = {
  [key in T]: string | number
}

export interface TableProps<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
  /** You can apply custom css classes to make styling easier */
  classNames?: {
    container?: string
    tableContainer?: string
    table?: string
    select?: string
    search?: string
    informations?: string
    navigation?: string
  }
}

export declare function Table<T extends string>(props: TableProps<T>): JSX.Element;

export { };