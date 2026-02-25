import '@picocss/pico/css/pico.amber.min.css'
import './main.css'
import { apiClient } from './api_client'
import { useEffect, useState } from 'react'

const App = () => {
  const [sets, setSets] = useState<
    { id: number; name: string; code: string; cardCount: number; mechanics: string[] }[]
  >([])

  useEffect(() => {
    const fetchSets = async () => {
      const response = await apiClient.sets.$get()
      if (!response.ok) return
      const data = await response.json()
      setSets(data)
    }

    fetchSets()
  }, [])

  return (
    <main className='p-8 text-center'>
      <h1>Hono REST</h1>
      <pre className='text-left'>{JSON.stringify(sets, null, 2)}</pre>
    </main>
  )
}

export default App
