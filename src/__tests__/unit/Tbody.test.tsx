import { getNodeText, render, screen } from "@testing-library/react";
import { columns as mockColumns, rows as mockRows } from "../../__mocks__"
import type { Data } from "../../__mocks__";
import Tbody from "../../lib/components/Tbody/Tbody";
import { getRandomId } from "../../lib/utils";
import type { RowsUniqueIds } from "../../lib/hooks/useTable/useTable"
import { getMockRowsValuesInColumnOrder } from "./utils.test";

const mockRowsWithIds: RowsUniqueIds<keyof Data> = mockRows.map((row) => {
  return { ...row, uniqueId: getRandomId() }
})

describe("Given i'm calling <Tbody />", () => {
  describe("When I'm passing mocked data as props", () => {
    beforeEach(() => {
      render(<Tbody columns={mockColumns} rowsData={mockRowsWithIds} />)
    })

    test("Then the number of displayed rows should be equal to mock rows length", () => {
      const rowsElements = screen.getAllByTestId("tbody-row")
      const mockRowsLength = mockRows.length
      expect(rowsElements).toHaveLength(mockRowsLength)
    })

    test("Then rows cells should be displayed in the correct order, according to columns", () => {
      const rowsValuesInColumnOrder = getMockRowsValuesInColumnOrder(mockRowsWithIds, mockColumns)

      const cellsTexts = screen
        .getAllByTestId("tbody-cell")
        .map(getNodeText)

      expect(cellsTexts).toEqual(rowsValuesInColumnOrder)
    })
  })

  describe("When I'm passing mocked data as props, sorted by firstNames in ascending order", () => {
    let rowsSortedByFirstnamesInAscendingOrder: RowsUniqueIds<keyof Data>

    beforeAll(() => {
      rowsSortedByFirstnamesInAscendingOrder = [...mockRowsWithIds].sort((a, b) => {
        return (a.firstName as string).localeCompare((b.firstName as string))
      })

      render(<Tbody columns={mockColumns} rowsData={rowsSortedByFirstnamesInAscendingOrder} />)
    })

    test("Then rows cells should be displayed in the correct order, according to columns", () => {
      const rowsValuesInColumnOrder = getMockRowsValuesInColumnOrder(rowsSortedByFirstnamesInAscendingOrder, mockColumns)

      const cellsTexts = screen
        .getAllByTestId("tbody-cell")
        .map(getNodeText)

      expect(cellsTexts).toEqual(rowsValuesInColumnOrder)
    })
  })

  describe("When I'm passing an empty row array as props", () => {
    beforeEach(() => {
      render(<Tbody columns={mockColumns} rowsData={[]} />)
    })

    test("Then the number of displayed rows in tbody should be equal to 1", () => {
      const rowsElements = screen.getAllByTestId("tbody-row")
      expect(rowsElements).toHaveLength(1)
    })

    test("Then 'No data found' should be displayed in the row", () => {
      const rowsElements = screen.getAllByTestId("tbody-row")
      expect(rowsElements[0]).toHaveTextContent("No data found")
    })
  })
})
