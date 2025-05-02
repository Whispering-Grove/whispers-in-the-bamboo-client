import { useEffect, useRef, useState } from 'react'

type UserPosition = {
  id: string
  dress: number
  hair: number
  position: {
    x: number
  }
}

export const MainPage = () => {
  const socketRef = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([])
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')

  const [positions, setPositions] = useState<UserPosition[]>([])
  const [myId, setMyId] = useState<string | null>(null)
  const [localMyX, setLocalMyX] = useState(0)

  const myPositionRef = useRef<UserPosition | null>(null)

  // WebSocket 연결
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000')
    socketRef.current = socket

    socket.onopen = () => {
      console.log('WebSocket connected')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'update-positions') {
        setPositions(data.payload)
      } else if (data.type === 'assign-id') {
        setMyId(data.payload.id)
      }
    }

    return () => {
      socket.close()
    }
  }, [])

  // 내 위치 추적
  useEffect(() => {
    if (!myId) return
    const mine = positions.find((p) => p.id === myId)
    if (mine) myPositionRef.current = mine
  }, [positions, myId])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!myId || !myPositionRef.current || !socketRef.current) return
      let newX = myPositionRef.current.position.x
      if (e.key === 'ArrowLeft') newX -= 5
      if (e.key === 'ArrowRight') newX += 5

      myPositionRef.current.position.x = newX
      setLocalMyX(newX)

      // 서버 동기화
      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: 'move', payload: { id: myId, x: newX } }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [myId])

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

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '100px' }}>
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
      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#4e4949' }}>
        {positions.map((user) => {
          const isMe = user.id === myId
          const x = isMe ? localMyX : user.position.x

          return (
            <div
              key={user.id}
              style={{
                left: `calc(50% + ${x}px)`,
                position: 'absolute',
                display: 'flex',
                bottom: '250px',
                width: '40px',
                height: '40px',
                backgroundColor: user.id === myId ? 'blue' : 'gray',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '40px',
                color: '#fff',
                transition: 'left 0.1s ease-out',
                flexDirection: 'column',
              }}
            >
              <span>{user.position.x}</span>
              <span style={{ fontSize: '12px' }}>{user.id}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
