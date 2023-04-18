import type { ChangeEvent } from "react"

interface Props {
  updatePageSize: ({ target }: ChangeEvent<HTMLSelectElement>) => void
}

const SelectPagesSize = ({ updatePageSize }: Props) => {
  const pagesSizes = [10, 25, 50, 100]

  return (
    <select
      name="paginationSize"
      id="paginationSize"
      onChange={updatePageSize}
    >
      {pagesSizes.map((size) => {
        return <option key={size} value={size}>{size}</option>
      })}
    </select>
  )
}

export default SelectPagesSize