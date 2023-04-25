interface Props {
  columnsLength: number
}

function NoData({ columnsLength }: Props) {
  return (
    <tr data-testid="tbody-row">
      <td colSpan={columnsLength}>No data found</td>
    </tr>
  )
}

export default NoData