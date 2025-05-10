import { useEffect } from 'react'
import { useAuthStore } from '@features/auth/store/useAuthStore.ts'
import { useWebSocket } from '@features/chat/hooks/useWebSocket.tsx'

export const useClearUserOnExit = () => {
  const { logout } = useAuthStore()
  const { disconnect } = useWebSocket()

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      logout()
      disconnect()
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
