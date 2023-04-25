import React from "react";
import { getNodeText, render, screen } from "@testing-library/react";
import { columns as mockColumns } from "../../__mocks__"
import { vi } from "vitest";
import Thead from "../../lib/Thead/Thead";
import type { SortState } from "../../lib/useTable";
import type { Data } from "../../__mocks__";

describe("Given i'm calling <Thead />", () => {
  describe("When I'm passing mocked data as props", () => {
    beforeEach(() => {
      const sort: SortState<keyof Data> = {
        type: "NONE",
        column: ""
      }
      const handleSort = vi.fn()

      render(<Thead sort={sort} handleSort={handleSort} columns={mockColumns} />)
    })

    test("Then numbers of thead cells should be equal to mock columns length", () => {
      const tHeadCells = screen.getAllByTestId("thead-th")
      expect(tHeadCells.length).toBe(mockColumns.length)
    })

    test("Then displayed thead cells text value should in the same order as columns mock", () => {
      const tHeadTitles = screen
        .getAllByTestId("thead-title")
        .map(getNodeText)

      const expectedColumnsAccessors = ["First Name", "Last Name", "Start Date", "Department", "Date of Birth", "Street", "State", "City", "Zip Code"]

      expect(tHeadTitles).toEqual(expectedColumnsAccessors)
    })
  })
})

