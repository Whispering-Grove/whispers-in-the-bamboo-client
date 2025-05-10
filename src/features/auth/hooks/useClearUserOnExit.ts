import { useEffect } from 'react'
import { useAuthStore } from '@features/auth/store/useAuthStore.ts'

export const useClearUserOnExit = () => {
  const { logout } = useAuthStore()

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      logout()
      e.preventDefault()
      return ''
    }

    window.addEventListener('beforeunload', handler)

    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [])

  return null
}
