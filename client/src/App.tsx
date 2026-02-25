import '@picocss/pico/css/pico.amber.min.css'
import './main.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SetsPage } from './sets/SetsPage'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <main className='p-8 text-center'>
        <SetsPage />
      </main>
    </QueryClientProvider>
  )
}

export default App
