import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Import the necessary pieces from TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. Create a client instance outside the component
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. WRAP YOUR APP HERE */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)