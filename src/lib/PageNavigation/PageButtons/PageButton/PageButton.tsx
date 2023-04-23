interface Props {
  changePage: (pageNumber: number) => () => void
  currentPageNumber: number,
  pageToGo: number
}

const PageButton = ({ currentPageNumber, changePage, pageToGo }: Props) => {
  const isCurrentPage = currentPageNumber === pageToGo

  return (
    <button
      data-current={isCurrentPage}
      key={pageToGo}
      onClick={changePage(pageToGo - 1)}
    >
      {pageToGo}
    </button>
  )
}

export default PageButton