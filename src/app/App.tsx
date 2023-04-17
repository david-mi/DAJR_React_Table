import { columns, rows, Data } from "../__mocks__/"
import generateEmployees from "employees-generator/generate"
import Table from "../lib/Table"

const employees = generateEmployees<Data>({ amount: 1000 })
console.log("generate")
function App() {
  return (
    <Table<keyof Data>
      columns={columns}
      rows={employees}
    />
  )
}

export default App
