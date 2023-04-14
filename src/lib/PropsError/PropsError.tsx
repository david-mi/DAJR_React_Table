interface Props {
  error: string
}

const PropsError = ({ error }: Props) => {
  return (
    <p>{error}</p>
  )
}

export default PropsError