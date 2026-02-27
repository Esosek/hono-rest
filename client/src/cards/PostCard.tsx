import { useQuery } from '@tanstack/react-query'

import { apiClient } from '../api_client'
import { useState } from 'react'
import { CardTypeEnum, ColorEnum, RarityEnum } from '../../../server/src/interfaces'
import { Select } from '../fields/Select'

type ISubmitData = {
  name: string
  color: ColorEnum
  rarity: RarityEnum
  type: CardTypeEnum
  setCode: string
  power?: number
  toughness?: number
}

export const PostCard = () => {
  const [formData, setFormData] = useState<ISubmitData>({
    name: '',
    color: ColorEnum.RED,
    rarity: RarityEnum.COMMON,
    type: CardTypeEnum.ARTIFACT,
    setCode: '',
    power: undefined,
    toughness: undefined,
  })
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['post_card'],
    enabled: false,
    queryFn: async () => {
      const response = await apiClient.cards.$post({
        json: {
          ...formData,
        },
      })
      return await response.json()
    },
  })

  const onChange = (fieldName: string, value: string) => {
    setFormData((state) => {
      let updatedValue: string | number

      if (fieldName === 'power' || fieldName === 'toughness') {
        updatedValue = Number(value)
      } else updatedValue = value

      return { ...state, [fieldName]: updatedValue }
    })
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    refetch()
  }

  return (
    <>
      <h2>POST /cards</h2>
      <form onSubmit={handleSubmit} className='text-left'>
        <label htmlFor='card-name'>Name</label>
        <input
          type='text'
          placeholder='Bake into a Pie'
          name='card-name'
          id='card-name'
          maxLength={60}
          onChange={(e) => onChange('name', e.currentTarget.value)}
        />
        <label htmlFor='card-setcode'>Set Code</label>
        <input
          type='text'
          placeholder='ECL'
          name='card-setcode'
          id='card-setcode'
          maxLength={3}
          onChange={(e) => onChange('setCode', e.currentTarget.value)}
        />
        <Select
          id='card-color'
          label='Color'
          onChange={(value) => onChange('color', value)}
          options={Object.values(ColorEnum)}
          value={formData.color}
        />
        <Select
          id='card-rarity'
          label='Rarity'
          onChange={(value) => onChange('rarity', value)}
          options={Object.values(RarityEnum)}
          value={formData.rarity}
        />
        <Select
          id='card-type'
          label='Type'
          onChange={(value) => onChange('type', value)}
          options={Object.values(CardTypeEnum)}
          value={formData.type}
        />
        {formData.type === CardTypeEnum.CREATURE && (
          <div>
            <label htmlFor='card-power'>Power</label>
            <input
              type='number'
              name='card-power'
              id='card-power'
              min={1}
              max={99}
              placeholder='1'
              value={formData.power}
              onChange={(e) => onChange('power', e.currentTarget.value)}
            />
            <label htmlFor='card-power'>Toughness</label>
            <input
              type='number'
              name='card-toughness'
              id='card-toughness'
              min={1}
              max={99}
              placeholder='1'
              value={formData.toughness}
              onChange={(e) => onChange('toughness', e.currentTarget.value)}
            />
          </div>
        )}
        <button>Create</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre className='text-left'>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}
