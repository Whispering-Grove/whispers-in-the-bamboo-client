import { useEffect, useRef, useState } from 'react'
import * as S from './styles.ts'
import { Features } from '@pages/MainPage/components/Features'

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

  const [positions, setPositions] = useState<UserPosition[]>([])
  const [myId, setMyId] = useState<string | null>(null)
  const [localMyX, setLocalMyX] = useState(0)

  const myPositionRef = useRef<UserPosition | null>(null)

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
        setPositions(data.payload)
      } else if (data.type === 'assign-id') {
        setMyId(data.payload.id)
        localStorage.setItem('userId', data.payload.id)
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

      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: 'move', payload: { id: myId, x: newX } }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [myId])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Features />
      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#4e4949' }}>
        {positions.map((user) => {
          const isMe = user.id === myId
          const x = isMe ? localMyX : user.position.x

          const handleKick = () => {
            if (!isMe && socketRef.current?.readyState === WebSocket.OPEN) {
              socketRef.current.send(JSON.stringify({ type: 'kick', payload: { id: user.id } }))
            }
          }

          return (
            <S.Character isMe={isMe} x={x} key={user.id} onClick={handleKick}>
              <span>{user.position.x}</span>
              <span style={{ fontSize: '12px' }}>{user.id}</span>
            </S.Character>
          )
        })}
      </div>
    </div>
  )
}
