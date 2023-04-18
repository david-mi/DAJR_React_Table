import { ChangeEvent, useEffect, useRef } from "react"

interface Props {
  hasPreviousPage: boolean
  goToPreviousPage: () => void
  hasNextPage: boolean
  goToNextPage: () => void
  goToPage: (pageNumber: number) => void
  currentPageIndex: number
  pagesNumber: number
}

const Buttons = (props: Props) => {
  const {
    hasPreviousPage,
    goToPreviousPage,
    hasNextPage,
    goToNextPage,
    goToPage,
    currentPageIndex,
    pagesNumber
  } = props

  const currentPageNumber = currentPageIndex + 1
  const lastPageNumber = pagesNumber
  const hasMoreThanOnePage = pagesNumber > 1
  const inputRef = useRef<HTMLInputElement>(null!)

  function handleInput({ target }: ChangeEvent<HTMLInputElement>) {
    const inputNumberValue = parseInputValue(target.value)
    if (inputNumberValue === undefined) return

    goToPage(inputNumberValue - 1)
  }

  function parseInputValue(inputValue: string): number | undefined {
    if (inputValue === "") {
      return 1
    }

    if (/^\d+$/.test(inputValue) === false) return

    const inputValueNumber = parseInt(inputValue)
    if (inputValueNumber > lastPageNumber) return

    return inputValueNumber < 1
      ? 1
      : inputValueNumber
  }

  useEffect(() => {
    const inputNumberValue = parseInputValue(inputRef.current.value)
    if (inputNumberValue !== currentPageNumber) {
      inputRef.current.value = String(currentPageNumber)
    }

  }, [currentPageNumber])

  return (
    <div>
      <button disabled={!hasPreviousPage} onClick={goToPreviousPage}>Previous</button>
      {hasMoreThanOnePage && (
        <input
          type="number"
          onChange={handleInput}
          defaultValue={currentPageNumber}
          ref={inputRef}
        />
      )}
      <span>/{pagesNumber}</span>
      <button disabled={!hasNextPage} onClick={goToNextPage}>Next</button>
    </div>
  )
}

export default Buttons