import './main.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SetsPage } from './sets/SetsPage'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './Layout'
import { CardsPage } from './cards/CardsPage'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<SetsPage />} />
            <Route path='/cards' element={<CardsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
