export interface Column<T> {
  title: string,
  /** a property from Row */
  accessor: T
}

export type Row<T extends string> = {
  [key in T]: string | number
}

export interface ClassNames {
  container?: string
  tableContainer?: string
  table?: string
  pageSelect?: string
  search?: string
  informations?: string
  navigation?: string
  footer?: string
}
export interface Colors {
  hover?: string,
  button?: string
  buttonCurrentPage?: string
  buttonDisabled?: string
  sortArrow?: string
  sortArrowActive?: string
  head?: string
}