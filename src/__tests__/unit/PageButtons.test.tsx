import { getNodeText, render, screen } from "@testing-library/react";
import PageButtons, { Props } from "../../lib/components/PageNavigation/PageButtons/PageButtons";
import { vi } from "vitest";

let props: Props
let changePageCallback: () => void

beforeAll(() => {
  changePageCallback = vi.fn()

  props = {
    changePage: vi.fn((pageToGo) => changePageCallback),
    currentPageNumber: 1,
    lastPageNumber: 6
  }
})

describe("Given i have less than 7 pages", () => {
  describe("When i have 1 page", () => {
    test("Then it should display button 1", () => {
      props.lastPageNumber = 1
      render(<PageButtons {...props} />)

      const pageButtonsElements = screen.getAllByTestId("page-button")
      const expectedPageNumbers = ["1"]

      expect(pageButtonsElements.length).toBe(1)
      expect(pageButtonsElements.map(getNodeText)).toEqual(expectedPageNumbers)
    })
  })

  describe("When i have 6 pages", () => {
    describe("And i'm on page 1", () => {
      test("Then it should display the first 6 pages buttons", () => {
        props.lastPageNumber = 6
        props.currentPageNumber = 1
        render(<PageButtons {...props} />)

        const pageButtonsElements = screen.getAllByTestId("page-button")
        const expectedPageNumbers = ["1", "2", "3", "4", "5", "6"]

        expect(pageButtonsElements.length).toBe(6)
        expect(pageButtonsElements.map(getNodeText)).toEqual(expectedPageNumbers)
      })
    })

    describe("And i'm on page 6", () => {
      test("Then it should display the first 6 pages buttons", () => {
        props.lastPageNumber = 6
        props.currentPageNumber = 6
        render(<PageButtons {...props} />)

        const pageButtonsElements = screen.getAllByTestId("page-button")
        const expectedPageNumbers = ["1", "2", "3", "4", "5", "6"]

        expect(pageButtonsElements.length).toBe(6)
        expect(pageButtonsElements.map(getNodeText)).toEqual(expectedPageNumbers)
      })
    })
  })
})

describe("Given i have 7 or more pages", () => {
  describe("When i have 7 pages", () => {
    describe("And i'm on page 1", () => {
      test("Then it should should display the first 5 pages buttons, then ..., then button 7", () => {
        props.lastPageNumber = 7
        props.currentPageNumber = 1
        render(<PageButtons {...props} />)

        const pageButtonsWrapper = screen.getByTestId("page-buttons")
        const expectedPageButtonsWrapperText = ["1", "2", "3", "4", "5", "...", "7"]
        const arrayPageButtonsWrapper = Array.from(pageButtonsWrapper.children)
        const pageButtonsWrapperTextArray = Array
          .from(pageButtonsWrapper.children)
          .map((element) => getNodeText(element as HTMLElement))

        expect(arrayPageButtonsWrapper.length).toBe(7)
        expect(pageButtonsWrapperTextArray).toEqual(expectedPageButtonsWrapperText)
      })
    })

    describe("And i'm on page 7", () => {
      test("Then it should display the first page button, then ..., then last 5 pages buttons", () => {
        props.lastPageNumber = 7
        props.currentPageNumber = 7
        render(<PageButtons {...props} />)

        const pageButtonsWrapper = screen.getByTestId("page-buttons")
        const expectedPageButtonsWrapperText = ["1", "...", "3", "4", "5", "6", "7"]
        const arrayPageButtonsWrapper = Array.from(pageButtonsWrapper.children)
        const pageButtonsWrapperTextArray = Array
          .from(pageButtonsWrapper.children)
          .map((element) => getNodeText(element as HTMLElement))

        expect(arrayPageButtonsWrapper.length).toBe(7)
        expect(pageButtonsWrapperTextArray).toEqual(expectedPageButtonsWrapperText)
      })
    })

  })

  describe("When i have 500 pages", () => {
    describe("And i'm on page 1", () => {
      test("Then it should display the first 5 pages buttons, then ..., then page 500 button", () => {
        props.lastPageNumber = 500
        props.currentPageNumber = 1
        render(<PageButtons {...props} />)

        const pageButtonsWrapper = screen.getByTestId("page-buttons")
        const expectedPageButtonsWrapperText = ["1", "2", "3", "4", "5", "...", "500"]
        const arrayPageButtonsWrapper = Array.from(pageButtonsWrapper.children)
        const pageButtonsWrapperTextArray = Array
          .from(pageButtonsWrapper.children)
          .map((element) => getNodeText(element as HTMLElement))

        expect(arrayPageButtonsWrapper.length).toBe(7)
        expect(pageButtonsWrapperTextArray).toEqual(expectedPageButtonsWrapperText)
      })
    })

    describe("And i'm on page 10", () => {
      test("Then it should display page 1 button, then ..., then page, 9, 10, 11 buttons then page 500 button", () => {
        props.lastPageNumber = 500
        props.currentPageNumber = 10
        render(<PageButtons {...props} />)

        const pageButtonsWrapper = screen.getByTestId("page-buttons")
        const expectedPageButtonsWrapperText = ["1", "...", "9", "10", "11", "...", "500"]
        const arrayPageButtonsWrapper = Array.from(pageButtonsWrapper.children)
        const pageButtonsWrapperTextArray = Array
          .from(pageButtonsWrapper.children)
          .map((element) => getNodeText(element as HTMLElement))

        expect(arrayPageButtonsWrapper.length).toBe(7)
        expect(pageButtonsWrapperTextArray).toEqual(expectedPageButtonsWrapperText)
      })
    })
  })
})