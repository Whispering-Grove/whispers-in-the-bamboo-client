import * as S from './styles.ts'
import { useEffect, useState } from 'react'
import { ChatBubble } from '@widgets/chat/ui/ChatBubble'
import { useWebSocket } from '@features/chat/hooks/useWebSocket.tsx'
import { MESSAGE_LIMIT_LENGTH } from '@features/chat/config/limit.ts'

export const Zone = () => {
  const { socket, myId, users, sendMove, sendChat } = useWebSocket()
  const [localMyX, setLocalMyX] = useState(0)
  const [userChats, setUserChats] = useState<Record<string, string>>({})
  const [isChatting, setIsChatting] = useState(false)
  const [chatMessage, setChatMessage] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        e.preventDefault()

        if (!isChatting) {
          setIsChatting(true)
        } else {
          const trimmed = chatMessage.trim()
          if (trimmed) {
            sendChat(trimmed)
            setChatMessage('')

            setTimeout(() => {
              setIsChatting(false)
            }, 0)
          } else {
            setIsChatting(false)
          }
        }
      }

      if (e.code === 'Escape') {
        e.preventDefault()
        setIsChatting(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isChatting, chatMessage, sendChat])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!myId || !socket || isChatting) return

      setLocalMyX((prevX) => {
        let newX = prevX

        if (e.key === 'ArrowLeft') newX -= 5
        else if (e.key === 'ArrowRight') newX += 5
        else return prevX

        if (socket.readyState === WebSocket.OPEN) {
          sendMove(newX)
        }

        return newX
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [myId, socket, sendMove])

  useEffect(() => {
    if (!socket) return

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.type === 'chat') {
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

    socket.addEventListener('message', handleMessage)
    return () => socket.removeEventListener('message', handleMessage)
  }, [socket])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div>
        {users.map((user) => {
          const isMe = user.id === myId
          const x = isMe ? localMyX : user.position.x
          const hairImageUrl = `src/assets/images/hairs/${user.hair}.png`

          const handleKick = () => {
            if (!isMe && socket?.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ type: 'kick', payload: { id: user.id } }))
            }
          }

          return (
            <S.Character isMe={isMe} x={x} key={user.id} onClick={handleKick}>
              {userChats[user.id] && <ChatBubble message={userChats[user.id]} />}
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
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 10,
            }}
            onClick={() => setIsChatting(false)}
          />

          <input
            autoFocus
            value={chatMessage}
            onChange={(e) => {
              if (e.target.value.length <= MESSAGE_LIMIT_LENGTH) setChatMessage(e.target.value)
            }}
            style={{
              position: 'absolute',
              bottom: '50%',
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
