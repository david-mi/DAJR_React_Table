interface Props {
  error: string
}

/** Displayed when an error occured with Table props */

const PropsError = ({ error }: Props) => {
  return (
    <p>{error}</p>
  )
}

export default PropsError