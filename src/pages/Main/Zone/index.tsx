import * as S from './styles.ts'
import { use, useEffect, useRef, useState } from 'react'
import { User } from '@pages/Main/interface.ts'

export const Zone = () => {
  const socketRef = useRef<WebSocket | null>(null)

  const [users, setUsers] = useState<User[]>([])
  const [myId, setMyId] = useState<string | null>(null)
  const [localMyX, setLocalMyX] = useState(0)

  const [userChats, setUserChats] = useState<Record<string, string>>({})

  const [isChatting, setIsChatting] = useState(false)
  const [chatMessage, setChatMessage] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setIsChatting(true)
      }

      if (e.code === 'Escape') {
        e.preventDefault()
        setIsChatting(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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

  useEffect(() => {
    console.log(userChats)
  }, [userChats])

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
      } else if (data.type === 'chat') {
        const { id, message } = data.payload
        setUserChats((prev) => ({ ...prev, [id]: message }))
        setTimeout(() => {
          setUserChats((prev) => {
            const newChats = { ...prev }
            delete newChats[id]
            return newChats
          })
        }, 7000)
      }
    }

    return () => {
      socket.close()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#4e4949' }}>
      <div>
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
              {userChats[user.id] && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '6px 10px',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '10px',
                    fontSize: '14px',
                    maxWidth: '200px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    zIndex: 10,
                  }}
                >
                  {userChats[user.id]}
                </div>
              )}

              <img
                src={hairImageUrl}
                alt={`${user.hair} hair`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </S.Character>
          )
        })}
      </div>

      {isChatting && (
        <div>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
            onClick={() => setIsChatting(false)}
          />

          <input
            autoFocus
            value={chatMessage}
            onChange={(e) => {
              if (e.target.value.length <= 30) setChatMessage(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && chatMessage && myId) {
                socketRef.current?.send(
                  JSON.stringify({
                    type: 'chat',
                    payload: { id: myId, message: chatMessage },
                  }),
                )
                setChatMessage('')
                setIsChatting(false)
              }
            }}
            style={{
              position: 'absolute',
              bottom: 100,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px',
              fontSize: '16px',
              zIndex: 11,
              width: '300px',
              backgroundColor: '#fff',
            }}
          />
        </div>
      )}
    </div>
  )
}
