import * as S from './styles.ts'
import { useEffect, useRef, useState } from 'react'
import { User } from '@pages/Main/interface.ts'

export const Zone = () => {
  const socketRef = useRef<WebSocket | null>(null)

  const [users, setUsers] = useState<User[]>([])
  const [myId, setMyId] = useState<string | null>(null)
  const [localMyX, setLocalMyX] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!myId || !socketRef.current) return

      setLocalMyX((prevX) => {
        let newX = prevX

        if (e.key === 'ArrowLeft') newX -= 5
        else if (e.key === 'ArrowRight') newX += 5
        else return prevX

        if (socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ type: 'move', payload: { id: myId, x: newX } }))
        }

        return newX
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [myId])

  // WebSocket 연결
  useEffect(() => {
    const existingId = localStorage.getItem('userId')
    const socket = new WebSocket(`ws://localhost:3000?userId=${existingId ?? ''}`)
    socketRef.current = socket

    socket.onopen = () => {
      console.log('WebSocket connected')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'update-positions') {
        setUsers(data.payload)
      } else if (data.type === 'assign-id') {
        setMyId(data.payload.id)
        localStorage.setItem('userId', data.payload.id)
      }
    }

    return () => {
      socket.close()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#4e4949' }}>
      {users.map((user) => {
        const isMe = user.id === myId
        const x = isMe ? localMyX : user.position.x
        const hairImageUrl = `src/assets/images/hairs/${user.hair}.png`

        const handleKick = () => {
          if (!isMe && socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ type: 'kick', payload: { id: user.id } }))
          }
        }

        return (
          <S.Character isMe={isMe} x={x} key={user.id} onClick={handleKick}>
            <img
              src={hairImageUrl}
              alt={`${user.hair} hair`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </S.Character>
        )
      })}
    </div>
  )
}
