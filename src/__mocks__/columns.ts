import type { Column } from "../lib/types"
import type { Employee } from "../app/types"

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