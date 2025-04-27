import { createRoot } from 'react-dom/client'
import App from './App'
import { GlobalStyle } from './assets/styles/GlobalStyle.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <App />
  </>,
)
