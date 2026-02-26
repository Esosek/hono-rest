import { useState } from 'react'

type IGetSetsProps = {
  isLoading: boolean
  error: Error | null
  data: string
}

export const GetSets = ({ isLoading, error, data }: IGetSetsProps) => {
  const [isDataShown, setIsDataShown] = useState(false)
  return (
    <>
      <h2>GET /sets</h2>
      <button onClick={() => setIsDataShown((state) => !state)}>{isDataShown ? 'Hide' : 'Show'}</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && isDataShown && <pre className='text-left'>{data}</pre>}
    </>
  )
}
