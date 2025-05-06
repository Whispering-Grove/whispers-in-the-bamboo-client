import { ThemeProvider } from '@emotion/react'
import { theme } from '@shared/assets/styles/theme.ts'
import { GlobalStyle } from '@shared/assets/styles/GlobalStyle.tsx'
import { RouterProvider } from '@app/providers/router/RouterProvider.tsx'
import { Layout } from '@shared/ui/Layout'
import { BrowserRouter } from 'react-router-dom'
import { WebSocketProvider } from '../context/useWebSocket.tsx'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <WebSocketProvider>
        <GlobalStyle />
        <Layout>
          <BrowserRouter>
            <RouterProvider />
          </BrowserRouter>
        </Layout>
      </WebSocketProvider>
    </ThemeProvider>
  )
}
