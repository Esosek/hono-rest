import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { apiClient } from '../api_client'

type IGetSetByCodeProps = {
  sets: { code: string; name: string }[]
}

export const GetSetByCode = ({ sets }: IGetSetByCodeProps) => {
  const [selectedSet, setSelectedSet] = useState('ecl')
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['set_by_code'],
    enabled: false,
    queryFn: async () => {
      const response = await apiClient.sets[':code'].$get({ param: { code: selectedSet } })
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
      <h2>GET /sets/:code</h2>
      <select
        name='set-code'
        id='code-select'
        value={selectedSet}
        onChange={(e) => {
          setSelectedSet(e.currentTarget.value)
        }}
      >
        {sets.map((set) => (
          <option key={set.code} value={set.code}>{`${set.code.toUpperCase()} - ${set.name}`}</option>
        ))}
      </select>
      <button onClick={handleClick}>Fetch</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre className='text-left'>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}
