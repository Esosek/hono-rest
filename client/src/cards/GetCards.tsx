import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { apiClient } from '../api_client'
import { CardTypeEnum, RarityEnum } from '../../../server/src/interfaces'
import { sets } from '../../../server/src/data/sets'

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
        <label htmlFor='card-set'>Set Name</label>
        <select
          name='card-set'
          id='card-set'
          value={formData.set}
          onChange={(e) => onChange('set', e.currentTarget.value)}
        >
          <option value='all'>---</option>
          {Object.values(sets).map((set) => (
            <option key={set.code} value={set.code}>
              {set.code + ' - ' + set.name}
            </option>
          ))}
        </select>
        <label htmlFor='card-type'>Type</label>
        <select name='card-type' id='card-type' onChange={(e) => onChange('type', e.currentTarget.value)}>
          <option value='all'>---</option>
          {Object.values(CardTypeEnum).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label htmlFor='card-rarity'>Rarity</label>
        <select name='card-rarity' id='card-rarity' onChange={(e) => onChange('rarity', e.currentTarget.value)}>
          <option value='all'>---</option>
          {Object.values(RarityEnum).map((rarity) => (
            <option key={rarity} value={rarity}>
              {rarity}
            </option>
          ))}
        </select>
        <button>Fetch</button>
      </form>

      <pre className='text-left'>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
