import { useEffect, useState } from 'react'

const socket = new WebSocket('ws://localhost:3000')

type UserPosition = {
  id: string
  dress: number
  hair: number
  position: {
    x: number
  }
}

export const MainPage = () => {
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([])
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')

  const [positions, setPositions] = useState<UserPosition[]>([])
  const [myId, setMyId] = useState<string | null>(null)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const myPosition = positions.find((p) => p.id === myId)
      if (!myPosition) return

      let newX = myPosition.position.x

      if (e.key === 'ArrowLeft') {
        newX -= 10
      } else if (e.key === 'ArrowRight') {
        newX += 10
      } else {
        return // 좌우 키 이외에는 무시
      }

      socket.send(JSON.stringify({ type: 'move', payload: { id: myId, x: newX } }))
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [positions, myId])

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

  useEffect(() => {
    console.log(positions)
  }, [positions])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '100px' }}>
        <input type="text" placeholder="사용자명" value={user} onChange={(e) => setUser(e.target.value)} />
        <input type="text" placeholder="메시지 내용" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSendMessage}>보내기</button>

        <h2>최근 메시지</h2>
        <h2>메시지 보내기</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.user}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#4e4949' }}>
        {positions.length &&
          positions.map((user) => (
            <div
              key={user.id}
              style={{
                position: 'absolute',
                display: 'flex',
                left: `calc(100% / 2 + ${user.position.x}px)`,
                bottom: '250px',
                width: '40px',
                height: '40px',
                backgroundColor: user.id === myId ? 'blue' : 'gray',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '40px',
                color: '#fff',
                transition: 'ease-out',
                flexDirection: 'column',
              }}
            >
              <span>{user.position.x}</span>
              <span style={{ fontSize: '12px' }}>{user.id}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
