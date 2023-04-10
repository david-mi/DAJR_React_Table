import generateEmployees from "employees-generator"
import type { Column } from "../lib/Table"

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

export const employees = generateEmployees<Employee>({ amount: 2 })

export const columns: Column<keyof Employee>[] = [
  {
    title: "First Name",
    key: "firstName"
  },
  {
    title: "Last Name",
    key: "lastName"
  },
  {
    title: "Start Date",
    key: "startDate"
  },
  {
    title: "Department",
    key: "department"
  },
  {
    title: "Date of Birth",
    key: "birthDate"
  },
  {
    title: "Street",
    key: "street"
  },
  {
    title: "City",
    key: "city"
  },
  {
    title: "State",
    key: "state"
  },
  {
    title: "Zip Code",
    key: "zipCode"
  }
]