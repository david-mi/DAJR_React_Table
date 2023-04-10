interface Props<T extends string> {
  rowsArrayValues: T[][]
}

function Tbody<T extends string>({ rowsArrayValues }: Props<T>) {
  return (
    <tbody>
      {rowsArrayValues.map((dataValue, index) => (
        <tr key={index}>
          {dataValue.map(data => <td key={data}>{data}</td>)}
        </tr>
      ))}
    </tbody>
  )
}

export default Tbody