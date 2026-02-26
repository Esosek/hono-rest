import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { apiClient } from '../api_client'

type IGetCardByIdProps = {
  maxId?: number
}

export const GetCardById = ({ maxId }: IGetCardByIdProps) => {
  const [cardId, setCardId] = useState(1)
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['set_by_code'],
    enabled: false,
    queryFn: async () => {
      const response = await apiClient.cards[':id'].$get({ param: { id: cardId } })
      if (!response.ok) {
        console.error(response.status)
        return
      }
      return await response.json()
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    refetch()
  }

  return (
    <>
      <h2>GET /cards/:id</h2>
      <input
        type='number'
        name='card-id'
        id='card-id'
        max={maxId ?? 5}
        min={1}
        value={cardId}
        onChange={(e) => setCardId(Number(e.currentTarget.value))}
      />
      <button onClick={handleClick}>Fetch</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre className='text-left'>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}
