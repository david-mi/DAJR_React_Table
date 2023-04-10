export interface Column<T extends string> {
  title: string,
  accessor: T
}

export type Row<T extends string> = {
  [key in T]: string | number
}