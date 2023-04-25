import { render, screen } from "@testing-library/react";
import SortIcon from "../../lib/components/Thead/SortIcon/SortIcon";
import type { Props } from "../../lib/components/Thead/SortIcon/SortIcon";
import type { Data } from "../../__mocks__";

describe("Given i'm calling <SortIcon />", () => {
  let props: Props<keyof Data>
  let iconsFromFirstNameColumn: HTMLDivElement

  beforeEach(() => {
    render(<SortIcon {...props} />)
    iconsFromFirstNameColumn = screen.getByTestId("thead-icons-firstName")
  })

  describe("When accessor props is equal to sort.column in props", () => {
    beforeAll(() => {
      props = {
        accessor: "firstName",
        sort: {
          column: "firstName",
          type: "ASC"
        }
      }
    })

    describe("When sort type props is equal to 'ASC'", () => {
      test("Then ascending sort icon from firstName column should have data-active attribute set to 'true'", () => {
        const ascIconFromFirstNameColumn = iconsFromFirstNameColumn.children[0]

        expect(ascIconFromFirstNameColumn.getAttribute("data-active")).toBe("true")
      })

      test("Then descending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const descIconFromFirstNameColumn = iconsFromFirstNameColumn.children[1]

        expect(descIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })
    })

    describe("When sort type props is equal to 'DESC'", () => {
      beforeAll(() => {
        props.sort.type = "DESC"
      })

      test("Then ascending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const ascIconFromFirstNameColumn = iconsFromFirstNameColumn.children[0]

        expect(ascIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })

      test("Then descending sort icon from firstName column should have data-active attribute set to 'true'", () => {
        const descIconFromFirstNameColumn = iconsFromFirstNameColumn.children[1]

        expect(descIconFromFirstNameColumn.getAttribute("data-active")).toBe("true")
      })
    })

    describe("When sort type props is equal to 'NONE'", () => {
      beforeAll(() => {
        props.sort.type = "NONE"
      })

      test("Then ascending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const ascIconFromFirstNameColumn = iconsFromFirstNameColumn.children[0]

        expect(ascIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })

      test("Then descending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const descIconFromFirstNameColumn = iconsFromFirstNameColumn.children[1]

        expect(descIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })
    })
  })

  describe("When accessor props is different than sort.column in props", () => {
    beforeAll(() => {
      props = {
        accessor: "firstName",
        sort: {
          column: "birthDate",
          type: "ASC"
        }
      }
    })

    describe("When sort type props is equal to 'ASC'", () => {
      test("Then ascending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const ascIconFromFirstNameColumn = iconsFromFirstNameColumn.children[0]

        expect(ascIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })

      test("Then descending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const descIconFromFirstNameColumn = iconsFromFirstNameColumn.children[1]

        expect(descIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })
    })

    describe("When sort type props is equal to 'DESC'", () => {
      beforeAll(() => {
        props.sort.type = "DESC"
      })

      test("Then ascending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const ascIconFromFirstNameColumn = iconsFromFirstNameColumn.children[0]

        expect(ascIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })

      test("Then descending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const descIconFromFirstNameColumn = iconsFromFirstNameColumn.children[1]

        expect(descIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })
    })

    describe("When sort type props is equal to 'NONE'", () => {
      beforeAll(() => {
        props.sort.type = "NONE"
      })

      test("Then ascending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const ascIconFromFirstNameColumn = iconsFromFirstNameColumn.children[0]

        expect(ascIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })

      test("Then descending sort icon from firstName column should have data-active attribute set to 'false'", () => {
        const descIconFromFirstNameColumn = iconsFromFirstNameColumn.children[1]

        expect(descIconFromFirstNameColumn.getAttribute("data-active")).toBe("false")
      })
    })
  })
})