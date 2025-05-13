import { RouteObject } from 'react-router-dom'
import { Main } from '@pages/Main'
import { Login } from '@pages/Login'
import { LoginGuard } from '@widgets/auth/loginGuard.tsx'
import { Paths } from '@shared/config/paths.ts'

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
