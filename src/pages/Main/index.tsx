import { Features } from '@pages/Main/Features'
import { Zone } from '@pages/Main/Zone'
import * as S from './styles.ts'
import { memo, useEffect, useMemo } from 'react'
import { useWebSocket } from '@features/chat/hooks/useWebSocket.tsx'
import { useAuthStore } from '@features/auth/store/useAuthStore.ts'
import { useClearUserOnExit } from '@features/auth/hooks/useClearUserOnExit.ts'

export const Main = memo(() => {
  const { user } = useAuthStore()
  const myId = useMemo(() => user?.id, [user?.id])
  const { connect } = useWebSocket()
  useClearUserOnExit()

  useEffect(() => {
    if (myId) {
      connect(myId)
    }
  }, [])

  return (
    <S.Container>
      <Features />
      <Zone />
    </S.Container>
  )
})
