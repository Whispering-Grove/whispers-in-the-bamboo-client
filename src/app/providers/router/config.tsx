import { RouteObject } from 'react-router-dom'
import { Main } from 'src/pages/Main'
import { Login } from 'src/pages/Login'
import { Paths } from '@shared/config/Paths.ts'
import { LoginGuard } from '@widgets/auth/loginGuard.tsx'

export const routerConfig: RouteObject[] = [
  {
    path: Paths.login,
    element: (
      <LoginGuard>
        <Login />
      </LoginGuard>
    ),
  },
  {
    path: Paths.main,
    element: (
      <LoginGuard>
        <Main />
      </LoginGuard>
    ),
  },
]
