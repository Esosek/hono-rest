import { apiClient } from '../api_client'
import { useQuery } from '@tanstack/react-query'

export const CardsPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await apiClient.cards.$get({ query: { limit: 3 } })
      if (!response.ok) {
        console.error(response.status)
        return
      }
      return await response.json()
    },
  })

  return (
    <>
      <section>
        <h2>GET /cards</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <pre className='text-left'>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </>
  )
}
