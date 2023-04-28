import { expect } from "vitest";
import { render, screen, getNodeText } from "@testing-library/react";
import { checkTableProps, errors } from "../../lib/components/PropsError/checkTableProps";
import { Table } from "../../lib";
import { columns as mockColumns, rows as mockRows } from "../../__mocks__";
import { getMockRowsValuesInColumnOrder } from "./utils.test";

const defaultMockRowsLength = 10

describe("Given i'm calling <Table />", () => {
  describe("When I'm passing mocked data as props", () => {
    beforeEach(() => {
      render(<Table columns={mockColumns} rows={mockRows} />)
    })

    let columnsHeads: HTMLElement[]
    beforeEach(() => {
      columnsHeads = screen.getAllByTestId("thead-title")
    })

    test("Then the number of displayed columns should be equal to mock columns length", () => {
      const mockColumnsLength = mockColumns.length
      expect(columnsHeads).toHaveLength(mockColumnsLength)
    })

    test("Then the columns heads should display mock columns accessors in the same order", () => {
      const mockColumnsAccessorArray = mockColumns.reduce<string[]>((acc, el) => {
        acc.push(el.title)
        return acc
      }, [])

      const columnsHeadsValues = columnsHeads.map(getNodeText)
      expect(columnsHeadsValues).toEqual(mockColumnsAccessorArray)
    })

    test("Then number of displayed rows should be equal to mock rows length", () => {
      const rowsElements = screen.getAllByTestId("tbody-row")
      expect(rowsElements).toHaveLength(defaultMockRowsLength)
    })

    test("Then rows accessors should be displayed in the corresponding column", () => {
      const mockRowsValues = getMockRowsValuesInColumnOrder(mockRows, mockColumns)

      const cellsTexts = screen
        .getAllByTestId("tbody-cell")
        .map(getNodeText)

      mockRowsValues.length = cellsTexts.length

      expect(cellsTexts).toEqual(mockRowsValues)
    })
  })
})

describe("Given i'm using incorrect Table props", () => {
  const testsCases = [
    {
      description: "When columns props is missing",
      expectedError: new Error(errors.columns.missing),
      props: { rows: mockRows }
    },
    {
      description: "When columns type is incorrect",
      expectedError: new Error(errors.columns.notArray),
      props: {
        columns: {
          accessor: "firstName",
          title: "First name"
        },
        rows: mockRows
      }
    },
    {
      description: "When columns elements type is incorrect",
      expectedError: new Error(errors.columns.elements.notObject),
      props: {
        columns: ["2", "2", "2"],
        rows: mockRows
      }
    },
    {
      description: "When columns element have missing property",
      expectedError: new Error(errors.columns.elements.missingProperty),
      props: {
        columns: [
          mockColumns[0],
          { Title: "First name" }
        ],
        rows: mockRows
      }
    },
    {
      description: "When columns element have incorrect value",
      expectedError: new Error(errors.columns.elements.incorrectValue),
      props: {
        columns: [
          mockColumns[0],
          { title: "Jean", accessor: 50000 }
        ],
        rows: mockRows
      }
    },
    {
      description: "When rows props is missing",
      expectedError: new Error(errors.rows.missing),
      props: { columns: mockColumns, }
    },
    {
      description: "When rows type is incorrect",
      expectedError: new Error(errors.rows.notArray),
      props: { rows: "incorrect", columns: mockColumns, }
    },
    {
      description: "When rows elements type is incorrect",
      expectedError: new Error(errors.rows.elements.notObject),
      props: {
        rows: ["2", "2", "2"],
        columns: mockColumns,
      }
    },
    {
      description: "When rows element have missing property",
      expectedError: new Error(errors.rows.elements.missingProperty("lastName")),
      props: {
        columns: mockColumns,
        rows: [
          mockRows[0],
          {
            firstName: "Jean"
          }
        ]
      }
    },
    {
      description: "When rows element have incorrect value",
      expectedError: new Error(errors.rows.elements.incorrectValue("startDate")),
      props: {
        columns: mockColumns,
        rows: [
          {
            firstName: "Hanan",
            lastName: "Jean",
            startDate: () => "wrong",
            department: "Marketing",
            birthDate: "1973-12-03",
            state: "WA",
            street: "Ventura Blvd",
            city: "Los Angeles",
            zipCode: 80246
          }
        ]
      }
    },
    {
      description: "When classNames type is incorrect",
      expectedError: new Error(errors.classNames.notObject),
      props: {
        rows: mockRows,
        columns: mockColumns,
        classNames: ""
      }
    },
    {
      description: "When classNames property doesn't exist",
      expectedError: new Error(errors.classNames.notExistingPropertyName("notExistingProps")),
      props: {
        rows: mockRows,
        columns: mockColumns,
        classNames: { container: "container", notExistingProps: "notExistingProps" }
      }
    },
    {
      description: "When classNames property value is not a string",
      expectedError: new Error(errors.classNames.notString("search")),
      props: {
        rows: mockRows,
        columns: mockColumns,
        classNames: {
          container: "container",
          search: ["search"],
          table: "table"
        }
      }
    }
  ]

  testsCases.forEach(({ description, expectedError, props }) => {
    describe(description, () => {
      test("Then checkTableProps should return the appropriate error", () => {
        expect(checkTableProps(props)).toEqual(expectedError)
      })

      test("Then <Table> should display the appropriate error message", () => {
        // @ts-ignore
        render(<Table {...props} />)
        expect(screen.getByText(expectedError.message)).toBeInTheDocument()
      })
    })
  })
})