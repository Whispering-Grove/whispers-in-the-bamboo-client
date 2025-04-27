import { useEffect, useState } from 'react'

const Main = () => {
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([])
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')

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

      // 메시지 보낸 후 다시 목록 새로고침
      const response = await fetch('http://localhost:3000/messages')
      const data = await response.json()
      setMessages(data)

      // 입력창 초기화
      setMessage('')
    } catch (error) {
      console.error('메시지 보내기 실패:', error)
    }
  }

  return (
    <div>
      <h2>메시지 보내기</h2>
      <input type="text" placeholder="사용자명" value={user} onChange={(e) => setUser(e.target.value)} />
      <input type="text" placeholder="메시지 내용" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>보내기</button>

      <h2>최근 메시지</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.user}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Main
