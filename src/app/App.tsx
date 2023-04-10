import type { Employee } from "./dataTable"
import { columns, employees } from "./dataTable"
import Table from "../lib/Table"

function App() {
  return (
    <Table<keyof Employee>
      columns={columns}
      rows={employees}
    />
  )
}

export default App
