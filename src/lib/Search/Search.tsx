import type { ChangeEvent, Dispatch, SetStateAction } from "react"

interface Props {
  setSearchInput: Dispatch<SetStateAction<string>>
  className?: string
}

/** Search input to filter table rows */

function Search({ setSearchInput, className }: Props) {

  /** 
   * Convert input value to lowerCase and sets it to searchInput state
   */

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setSearchInput(value.toLowerCase())
  }

  return (
    <div className={className}>
      <label htmlFor="search">Search: </label>
      <input type="text" onChange={handleSearchInput} data-testid="search-input" />
    </div>
  )
}

export default Search