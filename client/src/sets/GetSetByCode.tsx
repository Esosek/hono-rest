import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { apiClient } from '../api_client'
import { Select } from '../fields/Select'

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
      <Select
        id='set-code'
        value={selectedSet}
        onChange={(value) => setSelectedSet(value)}
        options={sets.map((set) => ({ label: set.name, value: set.code }))}
      />
      <button onClick={handleClick}>Fetch</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre className='text-left'>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}
