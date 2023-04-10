import generateEmployees from "employees-generator"
import type { Column } from "../lib/types"

export interface Employee {
  firstName: string
  lastName: string,
  startDate: string,
  department: string,
  birthDate: string,
  state: string,
  street: string,
  city: string,
  zipCode: number
}

export const employees = generateEmployees<Employee>({
  amount: 100
})

export const columns: Column<keyof Employee>[] = [
  {
    title: "First Name",
    accessor: "firstName"
  },
  {
    title: "Last Name",
    accessor: "lastName"
  },
  {
    title: "Start Date",
    accessor: "startDate"
  },
  {
    title: "Department",
    accessor: "department"
  },
  {
    title: "Date of Birth",
    accessor: "birthDate"
  },
  {
    title: "Street",
    accessor: "street"
  },
  {
    title: "State",
    accessor: "state"
  },
  {
    title: "City",
    accessor: "city"
  },
  {
    title: "Zip Code",
    accessor: "zipCode"
  }
]