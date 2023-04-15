import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { checkTableProps } from "../lib/PropsError/checkTableProps";
import { rows, columns } from "../__mocks__";
import { errors } from "../lib/PropsError/checkTableProps";
import { Table } from "../lib";



describe("Given i'm using incorrect Table props", () => {
  describe("When columns props is missing", () => {
    let expectedError: Error
    let props: Object
    beforeAll(() => {
      props = { rows }
      expectedError = new Error(errors.columns.missing)
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })

  describe("When columns type is incorrect", () => {
    let expectedError: Error
    let props: Object
    beforeAll(() => {
      expectedError = new Error(errors.columns.notArray)
      const columns = {
        accessor: "firstName",
        title: "First name"
      }
      props = { columns, rows }
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })

  describe("When columns elements type is incorrect", () => {
    let expectedError: Error
    let props: Object

    beforeAll(() => {
      const columns = ["2", "2", "2"]
      props = { columns, rows }
      expectedError = new Error(errors.columns.elements.notObject)
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })

  describe("When columns element have missing property", () => {
    let expectedError: Error
    let props: Object

    beforeAll(() => {
      props = {
        columns: [
          columns[0],
          { Title: "First name" }
        ],
        rows
      }
      expectedError = new Error(errors.columns.elements.missingProperty)
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })

  describe("When columns element have incorrect value", () => {
    let expectedError: Error
    let props: Object

    beforeAll(() => {
      props = {
        columns: [
          columns[0],
          {
            title: "Jean",
            accessor: 50000
          }
        ],
        rows
      }
      expectedError = new Error(errors.columns.elements.incorrectValue)
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })

  describe("When rows props is missing", () => {
    let expectedError: Error
    let props: Object
    beforeAll(() => {
      props = { columns }
      expectedError = new Error(errors.rows.missing)
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })

  describe("When rows type is incorrect", () => {
    let expectedError: Error
    let props: Object
    beforeAll(() => {
      expectedError = new Error(errors.rows.notArray)
      const rows = "incorrect"
      props = { columns, rows }
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })

  describe("When rows elements type is incorrect", () => {
    let expectedError: Error
    let props: Object

    beforeAll(() => {
      const rows = ["2", "2", "2"]
      props = { columns, rows }
      expectedError = new Error(errors.rows.elements.notObject)
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })

  describe("When rows element have missing property", () => {
    let expectedError: Error
    let props: Object

    beforeAll(() => {
      props = {
        columns,
        rows: [
          rows[0],
          {
            firstName: "Jean"
          }
        ]
      }
      expectedError = new Error(errors.rows.elements.missingProperty("lastName"))
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })

  describe("When rows element have incorrect value", () => {
    let expectedError: Error
    let props: Object

    beforeAll(() => {
      props = {
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
      expectedError = new Error(errors.rows.elements.incorrectValue("startDate"))
    })

    test("Then checkTableProps should return the appropriate error", () => {
      expect(checkTableProps(props)).toEqual(expectedError)
    })

    test("Then <Table> should display the appropriate error message", () => {
      render(<Table {...props} />)
      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
    })
  })
})