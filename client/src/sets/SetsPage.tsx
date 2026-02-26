import { apiClient } from '../api_client'
import { useQuery } from '@tanstack/react-query'
import { GetSets } from './GetSets'
import { GetSetByCode } from './GetSetByCode'
import { PostSet } from './PostSet'

export const SetsPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['sets'],
    queryFn: async () => {
      const response = await apiClient.sets.$get()
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
        <GetSets data={JSON.stringify(data, null, 2)} error={error} isLoading={isLoading} />
      </section>
      <section>
        {Array.isArray(data) && <GetSetByCode sets={data.map((set) => ({ code: set.code, name: set.name }))} />}
      </section>
      <section>
        <PostSet />
      </section>
    </>
  )
}
