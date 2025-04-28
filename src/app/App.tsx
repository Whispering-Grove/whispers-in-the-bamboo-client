import { ThemeProvider } from '@emotion/react'
import { theme } from '@shared/assets/styles/theme.ts'
import { GlobalStyle } from '@shared/assets/styles/GlobalStyle.tsx'
import { RouterProvider } from '@app/providers/router/RouterProvider.tsx'
import { Layout } from '@shared/ui/Layout'
import { BrowserRouter } from 'react-router-dom'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <BrowserRouter>
          <RouterProvider />
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  )
}
