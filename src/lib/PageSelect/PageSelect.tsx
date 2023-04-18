import type { ChangeEvent } from "react"

interface Props {
  updatePageSize: ({ target }: ChangeEvent<HTMLSelectElement>) => void
}

const PageSelect = ({ updatePageSize }: Props) => {
  const pagesSizes = [10, 25, 50, 100]
  const defaultOptionValue = pagesSizes[1]

  return (
    <select
      name="paginationSize"
      id="paginationSize"
      onChange={updatePageSize}
      defaultValue={defaultOptionValue}
    >
      {pagesSizes.map((size) => {
        return <option key={size} value={size}>{size}</option>
      })}
    </select>
  )
}

export default PageSelect