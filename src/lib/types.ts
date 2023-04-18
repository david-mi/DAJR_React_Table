export interface Column<T> {
  title: string,
  /** a property from Row */
  accessor: T
}

export type Row<T extends string> = {
  [key in T]: string | number
}