import { createRoot } from 'react-dom/client'
import { App } from '@app/App.tsx'
import { StrictMode } from 'react'
import { GlobalStyle } from './assets/styles/GlobalStyle.tsx'

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
)
