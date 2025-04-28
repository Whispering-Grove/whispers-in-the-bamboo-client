import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@features/auth/useAuth.ts'
import { Paths } from '@shared/config/Paths.ts'

export const LoginGuard = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()

  if (!isAuthenticated && pathname === Paths.main) {
    return <Navigate to="/login" state={{ from: pathname }} replace />
  }

  if (isAuthenticated && pathname === Paths.login) {
    return <Navigate to="/" state={{ from: pathname }} replace />
  }

  return <>{children}</>
}
