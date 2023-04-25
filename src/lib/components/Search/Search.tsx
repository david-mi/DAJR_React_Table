import type { ChangeEvent } from "react"

interface Props {
  handleSearch: (searchInput: string) => void
  className?: string
}

/** Search input to filter table rows */

function Search({ handleSearch, className }: Props) {

  /** 
   * Convert input value to lowerCase and sets it to searchInput state
   */

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    handleSearch(value.toLowerCase())
  }

  return (
    <div className={className}>
      <label htmlFor="search">Search: </label>
      <input type="text" onChange={handleSearchInput} data-testid="search-input" />
    </div>
  )
}

export default Search