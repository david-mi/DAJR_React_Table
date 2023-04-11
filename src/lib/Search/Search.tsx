import type { ChangeEvent, Dispatch, SetStateAction } from "react"

interface Props {
  setSearchInput: Dispatch<SetStateAction<string>>
}

function Search({ setSearchInput }: Props) {

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setSearchInput(value.toLowerCase())
  }

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" onChange={handleSearchInput} />
    </div>
  )
}

export default Search