import { fireEvent, render, screen } from "@testing-library/react";
import PageButton, { Props } from "../../lib/components/PageNavigation/PageButtons/PageButton/PageButton";
import { vi } from "vitest";

describe("Given i'm calling <PageButton />", () => {
  describe("When i'm passing mock data as props", () => {
    let props: Props
    let changePageCallback: () => void

    beforeAll(() => {
      changePageCallback = vi.fn()

      props = {
        changePage: vi.fn((pageToGo) => changePageCallback),
        currentPageNumber: 1,
        pageToGo: 3
      }
    })

    beforeEach(() => {
      render(<PageButton {...props} />)
    })

    test("Then it should call changePage function props, with correct argument", () => {
      const expectedChangePageArg = props.pageToGo - 1
      expect(props.changePage).toBeCalledWith(expectedChangePageArg)
    })

    test("Then button should display text with pageToGo props", () => {
      const pageButton = screen.getByTestId("page-button")
      const expectedButtonDisplayedText = String(props.pageToGo)
      expect(pageButton).toHaveTextContent(expectedButtonDisplayedText)
    })

    test("Then clicking on the button should call changePage's props callback", () => {
      const pageButton = screen.getByTestId("page-button")
      fireEvent.click(pageButton)
      expect(changePageCallback).toBeCalled()
    })
  })
})