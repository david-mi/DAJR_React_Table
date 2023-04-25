import { ChangeEvent, useEffect, useRef } from "react"
import PageButtons from "./PageButtons/PageButtons"

interface Props {
  hasPreviousPage: boolean
  goToPreviousPage: () => void
  hasNextPage: boolean
  goToNextPage: () => void
  goToPage: (pageNumber: number) => void
  currentPageIndex: number
  pagesNumber: number
  className?: string
}

/** Navigation part for pages */

const PageNavigation = (props: Props) => {
  const {
    hasPreviousPage,
    goToPreviousPage,
    hasNextPage,
    goToNextPage,
    goToPage,
    currentPageIndex,
    pagesNumber,
    className
  } = props

  const currentPageNumber = currentPageIndex + 1
  const lastPageNumber = pagesNumber
  const inputRef = useRef<HTMLInputElement>(null!)

  /**
   * Parse input value
   * - if {@link parseInputValue} returns a number, change the current page
   * - else return 
   */

  function handleInput({ target }: ChangeEvent<HTMLInputElement>) {
    const inputNumberValue = parseInputValue(target.value)
    if (inputNumberValue === undefined) return

    goToPage(inputNumberValue - 1)
  }

  /**
   * Utility function to parse retrieved input value
   * Prevent returning something different than a number or a number that is
   * bigger than {@link lastPageNumber} or lower than 1
   */

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

  function changePage(pageNumber: number) {
    return () => {
      goToPage(pageNumber)
    }
  }

  /**
   * Reset page input value if {@link currentPageNumber} is different than {@link inputNumberValue}
   * 
   * This could happend if user is sorting, filtering or changing pagination size,
   * which reset page to the first one
  */

  useEffect(() => {
    const inputNumberValue = parseInputValue(inputRef.current.value)
    if (inputNumberValue !== currentPageNumber) {
      inputRef.current.value = String(currentPageNumber)
    }

  }, [currentPageNumber])

  return (
    <div className={className}>
      <input
        type="number"
        onChange={handleInput}
        defaultValue={currentPageNumber}
        ref={inputRef}
      />
      <button disabled={!hasPreviousPage} onClick={goToPreviousPage}>Previous</button>
      <PageButtons
        changePage={changePage}
        currentPageNumber={currentPageNumber}
        lastPageNumber={lastPageNumber}
      />
      <button disabled={!hasNextPage} onClick={goToNextPage}>Next</button>
    </div>
  )
}

export default PageNavigation