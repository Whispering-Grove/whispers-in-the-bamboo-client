import { ThemeProvider } from '@emotion/react'
import theme from '@/assets/styles/theme.ts'
import Layout from '@/components/shared/Layout'
import Main from '@/pages/Main'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout
        children={{
          main: <Main />,
        }}
      />
    </ThemeProvider>
  )
}

export default App
