import * as S from './styles.ts'
import { useEffect, useState } from 'react'

export const Features = () => {
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([])
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')

  const handleSendMessage = async () => {
    if (!user || !message) {
      alert('사용자명과 메시지를 모두 입력해주세요.')
      return
    }

    try {
      await fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, message }),
      })

      const response = await fetch('http://localhost:3000/messages')
      const data = await response.json()
      setMessages(data)
      setMessage('')
    } catch (error) {
      console.error('메시지 보내기 실패:', error)
    }
  }

  // 메시지 로드
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/messages')
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error('메시지 불러오기 실패:', error)
      }
    }

    fetchMessages()
  }, [])

  return (
    <S.Features>
      <S.FeatureChat>
        <S.Chats>
          {messages.map((msg, index) => (
            <S.Chat key={index}>
              <strong>{msg.user}:</strong> {msg.message}
            </S.Chat>
          ))}
        </S.Chats>
      </S.FeatureChat>

      <S.FeatureMessage>
        <input type="text" placeholder="사용자명" value={user} onChange={(e) => setUser(e.target.value)} />
        <input type="text" placeholder="메시지 내용" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSendMessage}>보내기</button>
      </S.FeatureMessage>

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
