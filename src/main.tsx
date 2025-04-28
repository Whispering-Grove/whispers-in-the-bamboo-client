import { createRoot } from 'react-dom/client'
import { App } from '@app/App.tsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
