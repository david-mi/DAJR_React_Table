import React from 'react'

interface Props {
  hasNextPage: boolean
  hasPreviousPage: boolean
  currentPage: number,
  pagesNumber: number,
  goToNextPage: () => void
  goToPreviousPage: () => void
}

const PageNavigation = (props: Props) => {
  const {
    hasNextPage,
    hasPreviousPage,
    currentPage,
    pagesNumber,
    goToPreviousPage,
    goToNextPage
  } = props

  return (
    <div>
      <p>Page: {currentPage + 1} / {pagesNumber}</p>
      <button disabled={!hasPreviousPage} onClick={goToPreviousPage}>Previous</button>
      <button disabled={!hasNextPage} onClick={goToNextPage}>Next</button>
    </div>
  )
}

export default PageNavigation