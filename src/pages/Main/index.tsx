import { Features } from '@pages/Main/Features'
import { Zone } from '@pages/Main/Zone'
import * as S from './styles.ts'
import { useLayoutEffect, useMemo } from 'react'
import { useWebSocket } from '@features/chat/hooks/useWebSocket.tsx'
import { useAuthStore } from '@features/auth/store/useAuthStore.ts'
import { useClearUserOnExit } from '@features/auth/hooks/useClearUserOnExit.ts'

export const Main = () => {
  const { user } = useAuthStore()
  const myId = useMemo(() => user?.id, [user?.id])
  const { connect, disconnect } = useWebSocket()
  useClearUserOnExit()

  useLayoutEffect(() => {
    if (myId) {
      connect(myId)
    }

    return () => {
      disconnect()
    }
  }, [myId])

  return (
    <S.Container>
      <Features />
      <Zone />
    </S.Container>
  )
}
