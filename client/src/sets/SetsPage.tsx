import { apiClient } from '../api_client'
import { useQuery } from '@tanstack/react-query'
import { GetSets } from './GetSets'
import { GetSetByCode } from './GetSetByCode'

export const SetsPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['sets'],
    queryFn: async () => {
      const response = await apiClient.sets.$get()
      return await response.json()
    },
  })

  return (
    <>
      <GetSets data={JSON.stringify(data, null, 2)} error={error} isLoading={isLoading} />
      {Array.isArray(data) && <GetSetByCode sets={data.map((set) => ({ code: set.code, name: set.name }))} />}
    </>
  )
}
