import { RouteObject } from 'react-router-dom'
import { MainPage } from '@pages/MainPage'
import { LoginPage } from '@pages/LoginPage'
import { Paths } from '@shared/config/Paths.ts'
import { LoginGuard } from '@widgets/auth/loginGuard.tsx'

export const routerConfig: RouteObject[] = [
  {
    path: Paths.login,
    element: (
      <LoginGuard>
        <LoginPage />
      </LoginGuard>
    ),
  },
  {
    path: Paths.main,
    element: (
      <LoginGuard>
        <MainPage />
      </LoginGuard>
    ),
  },
]
