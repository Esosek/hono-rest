import { apiClient } from './api_client'
import { useQuery } from '@tanstack/react-query'

export const GetSets = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['sets'],
    queryFn: async () => {
      const response = await apiClient.sets.$get()
      return await response.json()
    },
  })

  return (
    <>
      <h1>GET /sets</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre className='text-left'>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}
