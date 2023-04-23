interface Props {
  changePage(pageNumber: number): () => void
  currentPageNumber: number
  pagesNumber: number
}

function NumberButtons(props: Props) {
  const { changePage, currentPageNumber, pagesNumber } = props
  const hasLessThanSevenPages = pagesNumber < 7
  const hasMoreThanThreePagesLeft = pagesNumber - currentPageNumber > 3
  const previousPageNumber = currentPageNumber - 1
  const lastPageIndex = pagesNumber - 1

  /** Create array of numbers representing pages number to display on buttons*/

  function createArrayOfPageNumber(length: number, start: number = 1) {
    const pageNumbers = []

    for (let i = start; i < start + length; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  function createButton(pageNumber: number) {
    return <button key={pageNumber} onClick={changePage(pageNumber - 1)}>{pageNumber}</button>
  }

  if (hasLessThanSevenPages) {
    return (
      <>
        {createArrayOfPageNumber(pagesNumber).map(createButton)}
      </>
    )
  }

  if (currentPageNumber < 5) {
    return (
      <>
        {createArrayOfPageNumber(5).map(createButton)}
        <span>...</span>
        <button onClick={changePage(lastPageIndex)}>{pagesNumber}</button>
      </>
    )
  }

  if (hasMoreThanThreePagesLeft) {
    return (
      <>
        <button onClick={changePage(0)}>1</button>
        <span>...</span>
        {createArrayOfPageNumber(3, previousPageNumber).map(createButton)}
        <span>...</span>
        <button onClick={changePage(lastPageIndex)}>{pagesNumber}</button>
      </>
    )
  }

  return (
    <>
      <button onClick={changePage(0)}>1</button>
      <span>...</span>
      {createArrayOfPageNumber(5, pagesNumber - 4).map(createButton)}
    </>
  )
}

export default NumberButtons