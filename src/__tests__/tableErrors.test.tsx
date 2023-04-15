import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { checkTableProps } from "../lib/PropsError/checkTableProps";
import { rows, columns } from "../__mocks__";
import { errors } from "../lib/PropsError/checkTableProps";
import { Table } from "../lib";

const testsCases = [
  {
    description: "When columns props is missing",
    expectedError: new Error(errors.columns.missing),
    props: { rows }
  },
  {
    description: "When columns type is incorrect",
    expectedError: new Error(errors.columns.notArray),
    props: {
      columns: {
        accessor: "firstName",
        title: "First name"
      },
      rows
    }
  },
  {
    description: "When columns elements type is incorrect",
    expectedError: new Error(errors.columns.elements.notObject),
    props: {
      columns: ["2", "2", "2"],
      rows
    }
  },
  {
    description: "When columns element have missing property",
    expectedError: new Error(errors.columns.elements.missingProperty),
    props: {
      columns: [
        columns[0],
        { Title: "First name" }
      ],
      rows
    }
  },
  {
    description: "When columns element have incorrect value",
    expectedError: new Error(errors.columns.elements.incorrectValue),
    props: {
      columns: [
        columns[0],
        { title: "Jean", accessor: 50000 }
      ],
      rows
    }
  },
  {
    description: "When rows props is missing",
    expectedError: new Error(errors.rows.missing),
    props: { columns }
  },
  {
    description: "When rows type is incorrect",
    expectedError: new Error(errors.rows.notArray),
    props: { rows: "incorrect", columns }
  },
  {
    description: "When rows elements type is incorrect",
    expectedError: new Error(errors.rows.elements.notObject),
    props: {
      rows: ["2", "2", "2"],
      columns
    }
  },
  {
    description: "When rows element have missing property",
    expectedError: new Error(errors.rows.elements.missingProperty("lastName")),
    props: {
      columns,
      rows: [
        rows[0],
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
      columns,
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
  }
]

describe("Given i'm using incorrect Table props", () => {
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