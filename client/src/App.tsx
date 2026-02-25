import '@picocss/pico/css/pico.amber.min.css'
import './main.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GetSets } from './GetSets'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <main className='p-8 text-center'>
        <GetSets />
      </main>
    </QueryClientProvider>
  )
}

export default App
