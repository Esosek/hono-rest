type IGetSetsProps = {
  isLoading: boolean
  error: Error | null
  data: string
}

export const GetSets = ({ isLoading, error, data }: IGetSetsProps) => {
  return (
    <>
      <h2>GET /sets</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre className='text-left'>{data}</pre>}
    </>
  )
}
