import * as S from './styles.ts'
import { useEffect, useState } from 'react'
import { useWebSocket } from '../../../context/useWebSocket.tsx'
import { DISPLAY_MESSAGE_LIMIT } from '../../../constants/limit.ts'

export const Features = () => {
  const { socket } = useWebSocket()
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([])

  useEffect(() => {
    if (!socket) return

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.type === 'chat') {
        const { id, message } = data.payload
        setMessages((prev) => {
          const updated = [...prev, { user: id, message }]
          return updated.slice(-DISPLAY_MESSAGE_LIMIT)
        })
      }
    }

    socket.addEventListener('message', handleMessage)
    return () => socket.removeEventListener('message', handleMessage)
  }, [socket])

  return (
    <S.Features>
      <S.FeatureChat>
        <S.Chats>
          {messages.map((msg, index) => (
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
    </S.Features>
  )
}
