import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Paths } from '@shared/config/paths.ts'
import { useAuthStore } from '@features/auth/store/useAuthStore'

export const LoginGuard = ({ children }: PropsWithChildren) => {
  const { user } = useAuthStore()
  const { pathname } = useLocation()

  if (!user?.id && pathname === Paths.main) {
    return <Navigate to="/login" replace />
  }

  if (user?.id && pathname === Paths.login) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
