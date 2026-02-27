import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { apiClient } from '../api_client'
import { CardTypeEnum, RarityEnum } from '../../../server/src/interfaces'
import { sets } from '../../../server/src/data/sets'
import { Select } from '../fields/Select'

type ISubmitData = {
  set?: string
  rarity?: RarityEnum
  type?: CardTypeEnum
}

export const GetCards = () => {
  const [formData, setFormData] = useState<ISubmitData>({
    rarity: undefined,
    set: undefined,
    type: undefined,
  })
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['cards'],
    enabled: false,
    queryFn: async () => {
      const response = await apiClient.cards.$get({ query: { limit: 3, ...formData } })
      if (!response.ok) {
        console.error(response.status)
        return
      }
      return await response.json()
    },
  })

  const onChange = (fieldName: string, value: string) => {
    setFormData((state) => ({ ...state, [fieldName]: value === 'all' ? undefined : value }))
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    refetch()
  }
  return (
    <>
      <h2>GET /cards</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <h3 className='text-left'>Filters</h3>
      <form className='text-left' onSubmit={handleSubmit}>
        <Select
          id='card-set'
          label='Set Name'
          onChange={(value) => onChange('set', value)}
          options={[
            { value: 'all', label: '---' },
            ...Object.values(sets).map((set) => ({ label: set.name, value: set.code })),
          ]}
          value={formData.set ?? '---'}
        />
        <Select
          id='card-type'
          label='Type'
          onChange={(value) => onChange('type', value)}
          options={[
            { value: 'all', label: '---' },
            ...Object.values(CardTypeEnum).map((type) => ({ label: type, value: type })),
          ]}
          value={formData.type ?? 'all'}
        />
        <Select
          id='card-rarity'
          label='Rarity'
          onChange={(value) => onChange('rarity', value)}
          options={[
            { value: 'all', label: '---' },
            ...Object.values(RarityEnum).map((rarity) => ({ label: rarity, value: rarity })),
          ]}
          value={formData.rarity ?? 'all'}
        />
        <button>Fetch</button>
      </form>

      <pre className='text-left'>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
