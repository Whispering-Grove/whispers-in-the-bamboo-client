import * as S from './styles.ts'
import { useEffect } from 'react'
import { useWebSocket } from '@features/chat/hooks/useWebSocket.tsx'
import { useChatStore } from '@features/chat/store/useChatStore.ts'
import { useAuthStore } from '@features/auth/store/useAuthStore.ts'

export const Features = () => {
  const { socket } = useWebSocket()
  const { setChats, chats } = useChatStore()
  const { logout } = useAuthStore()

  useEffect(() => {
    if (!socket) return

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      console.log(data)
      if (data.type === 'chat') {
        setChats(data.payload)
      }
    }

    socket.addEventListener('message', handleMessage)
    return () => socket.removeEventListener('message', handleMessage)
  }, [socket])

  return (
    <S.Features>
      <S.FeatureChat>
        <S.Chats>
          {Object.values(chats).map((msg, index) => (
            <S.Chat key={index}>
              <strong>익명의 사용자:</strong> {msg.message}
            </S.Chat>
          ))}
        </S.Chats>
      </S.FeatureChat>

      <S.FeatureController>
        <S.DeleteButton
          onClick={async () => {
            if (!confirm('정말 모든 사용자를 삭제하시겠습니까?')) return

            try {
              const res = await fetch('http://localhost:3000/clear-users', {
                method: 'POST',
              })
              const result = await res.json()
              alert(result.status)
            } catch (error) {
              alert('삭제 실패: ' + (error as Error).message)
            }
          }}
        >
          모든 사용자 삭제
        </S.DeleteButton>
      </S.FeatureController>
      <S.FeatureController>
        <S.DeleteButton onClick={logout}>로그아웃</S.DeleteButton>
      </S.FeatureController>
    </S.Features>
  )
}
