import { expect } from "vitest";
import type { Data } from "../../__mocks__"
import { columns } from "../../__mocks__";
import type { Column, Row } from "../../lib"

type RowsUniqueIdsPartial<T extends keyof Data> = ({
  uniqueId?: string;
} & Row<T>)[]

/**
 * Utility testing function
 * 
 * Get each rows property by column accessor order and push them in an array
 * - convert numbers values to strings before pushing them
 */

export function getMockRowsValuesInColumnOrder<T>(rows: RowsUniqueIdsPartial<keyof Data>, columns: Column<keyof Data>[]) {
  return rows.reduce<Array<string>>((acc, { uniqueId, ...row }) => {
    columns.forEach(({ accessor }) => {
      let rowAccessor = row[accessor]
      if (typeof rowAccessor === "number") {
        rowAccessor = String(rowAccessor)
      }

      acc.push(rowAccessor)
    })

    return acc
  }, [])
}

describe("Calling getMockRowsValuesInColumnOrder with mock data", () => {
  test("then returned value should equal expected result", () => {
    const fakeUsers: RowsUniqueIdsPartial<keyof Data> = [
      {
        "lastName": "Clara",
        "birthDate": "1990-09-14",
        "startDate": "2023-03-11",
        "street": "Houston St",
        "state": "DC",
        "department": "Human Resources",
        "zipCode": 75013,
        "firstName": "Liming",
        "city": "Oakland"
      },
      {
        "lastName": "Salvador",
        "department": "Marketing",
        "firstName": "Tony",
        "birthDate": "1980-05-17",
        "startDate": "2002-08-24",
        "zipCode": 98375,
        "street": "Santa Fe Ave",
        "city": "Laredo",
        "state": "MT"
      },
    ]

    const expectedResult = [
      "Liming", "Clara", "2023-03-11", "Human Resources", "1990-09-14", "Houston St", "DC", "Oakland", "75013", "Tony",
      "Salvador", "2002-08-24", "Marketing", "1980-05-17", "Santa Fe Ave", "MT", "Laredo", "98375"
    ];

    const mockRowsValuesInColumnOrder = getMockRowsValuesInColumnOrder(fakeUsers, columns)

    expect(mockRowsValuesInColumnOrder).toEqual(expectedResult)
  })
})

