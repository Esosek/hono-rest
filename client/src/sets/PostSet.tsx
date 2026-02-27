import { useQuery } from '@tanstack/react-query'

import { apiClient } from '../api_client'
import { useState } from 'react'

type ISubmitData = {
  name: string
  code: string
  mechanics: string[]
}

export const PostSet = () => {
  const [formData, setFormData] = useState<ISubmitData>({ name: '', code: '', mechanics: [] })
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['post_set'],
    enabled: false,
    queryFn: async () => {
      const response = await apiClient.sets.$post({
        json: {
          ...formData,
        },
      })
      return await response.json()
    },
  })

  const onChange = (fieldName: string, value: string) => {
    setFormData((state) => {
      let updatedValue: string | number | string[]

      if (fieldName === 'cardCount') {
        updatedValue = Number(value)
      } else if (fieldName === 'mechanics') {
        updatedValue = value.split('\n')
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
      <h2>POST /sets</h2>
      <form onSubmit={handleSubmit} className='text-left'>
        <label htmlFor='set-name'>Name</label>
        <input
          type='text'
          placeholder='Lorwyn Eclipsed'
          name='set-name'
          id='set-name'
          maxLength={50}
          onChange={(e) => onChange('name', e.currentTarget.value)}
        />
        <label htmlFor='set-code'>Code</label>
        <input
          type='text'
          placeholder='ECL'
          name='set-code'
          id='set-code'
          maxLength={3}
          onChange={(e) => onChange('code', e.currentTarget.value)}
        />
        <label htmlFor='set-mechanics'>Card Mechanics</label>
        <textarea
          name='set-mechanics'
          id='set-mechanics'
          rows={5}
          placeholder='Flying&#10;Landfall&#10;Void&#10;'
          onChange={(e) => onChange('mechanics', e.currentTarget.value)}
        ></textarea>
        <button>Create</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre className='text-left'>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}
