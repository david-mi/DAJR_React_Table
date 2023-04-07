import { data, columns } from "./dataTable"
import Table from "./Table"

function App() {
  return (
    <Table columns={columns} data={data} />
  )
}

export default App
