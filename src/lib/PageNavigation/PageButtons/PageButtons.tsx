import { createArrayOfNumbers } from "../../utils"
import PageButton from "./PageButton/PageButton"

export interface Props {
  changePage(pageNumber: number): () => void
  currentPageNumber: number
  lastPageNumber: number
}

function PageButtons({ changePage, currentPageNumber, lastPageNumber }: Props) {
  const firstPageNumber = 1
  const hasLessThanSevenPages = lastPageNumber < 7
  const hasMoreThanThreePagesLeft = lastPageNumber - currentPageNumber > 3
  const previousPageNumber = currentPageNumber - 1

  /** Create array of numbers representing pages number to display on buttons*/

  function createButtons(amount: number, pageToStart: number = 1) {
    return createArrayOfNumbers(amount, pageToStart)
      .map((pageToGo) => {
        return (
          <PageButton
            key={pageToGo}
            currentPageNumber={currentPageNumber}
            pageToGo={pageToGo}
            changePage={changePage}
          />
        )
      })
  }

  if (hasLessThanSevenPages) {
    return (
      <>
        {createButtons(lastPageNumber)}
      </>
    )
  }

  if (currentPageNumber < 5) {
    return (
      <>
        {createButtons(5)}
        <span>...</span>
        <PageButton
          currentPageNumber={currentPageNumber}
          pageToGo={lastPageNumber}
          changePage={changePage}
        />
      </>
    )
  }

  if (hasMoreThanThreePagesLeft) {
    return (
      <>
        <PageButton
          currentPageNumber={currentPageNumber}
          pageToGo={firstPageNumber}
          changePage={changePage}
        />
        <span>...</span>
        {createButtons(3, previousPageNumber)}
        <span>...</span>
        <PageButton
          key={lastPageNumber}
          currentPageNumber={currentPageNumber}
          pageToGo={lastPageNumber}
          changePage={changePage}
        />
      </>
    )
  }

  return (
    <>
      <PageButton
        currentPageNumber={currentPageNumber}
        pageToGo={firstPageNumber}
        changePage={changePage}
      />
      <span>...</span>
      {createButtons(5, lastPageNumber - 4)}
    </>
  )
}

export default PageButtons