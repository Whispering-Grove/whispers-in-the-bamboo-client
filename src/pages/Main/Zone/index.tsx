import * as S from './styles.ts'
import { useEffect, useMemo, useState } from 'react'
import { useWebSocket } from '@features/chat/hooks/useWebSocket.tsx'
import { MESSAGE_LIMIT_LENGTH } from '@features/chat/config/limit.ts'
import { useAuthStore } from '@features/auth/store/useAuthStore.ts'
import { useChatStore } from '@features/chat/store/useChatStore.ts'
import { ChatBubble } from '@widgets/chat/ui/ChatBubble'

export const Zone = () => {
  const { user } = useAuthStore()
  const { users, chats } = useChatStore()
  const myId = useMemo(() => user?.id, [user?.id])
  const { socket, isConnect, sendMove, sendChat } = useWebSocket()
  const [localMyX, setLocalMyX] = useState(-1)
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
          if (myId && trimmed) {
            sendChat(myId, trimmed)
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

    window.addEventListener('keypress', handleKeyDown)
    return () => window.removeEventListener('keypress', handleKeyDown)
  }, [isChatting, chatMessage, sendChat, myId])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!myId || !socket || isChatting || !isConnect) return

      const clientWidth = Math.min(window.innerWidth, 1300) - 80

      setLocalMyX((prevX) => {
        let newX = prevX

        if (e.key === 'ArrowLeft') newX -= 5
        else if (e.key === 'ArrowRight') newX += 5

        if (newX <= 0) {
          newX = 0
        }

        if (newX >= clientWidth) {
          newX = clientWidth
        }

        sendMove(myId, newX)

        return newX
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [myId, socket, isConnect, sendMove])

  useEffect(() => {
    if (localMyX === -1) {
      const me = users.filter((user) => user.id === myId)[0]
      setLocalMyX(me ? me.position.x : -1)
    }
  }, [users, isConnect])

  return (
    <S.ZoneWrapper>
      <div>
        {users.map((user) => {
          const isMe = user.id === myId
          if (isMe && localMyX === -1) return <></>

          const x = isMe ? localMyX : user.position.x
          const hairImageUrl = `src/shared/assets/images/hairs/${user.hair}.png`
          const massage = chats[user.id]?.slice(-1)?.[0]

          return (
            <S.Character isMe={isMe} x={x} key={user.id}>
              {massage && <ChatBubble key={`${user.id}-${chats[user.id][0].message}`} message={massage.message} />}
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
    </S.ZoneWrapper>
  )
}
