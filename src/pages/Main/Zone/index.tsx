import * as S from './styles.ts'
import { useEffect, useMemo, useState } from 'react'
import { useWebSocket } from '@features/chat/hooks/useWebSocket.tsx'
import { MESSAGE_DELAY_TIME, MESSAGE_LIMIT_LENGTH, MESSAGE_SEND_TIME } from '@features/chat/config/limit.ts'
import { useAuthStore } from '@features/auth/store/useAuthStore.ts'
import { useChatStore } from '@features/chat/store/useChatStore.ts'
import { ChatBubble } from '@widgets/chat/ui/ChatBubble'
import Prison from '@shared/assets/images/prison.png'
import { Timeout } from '@shared/lib/timer.ts'
import { hairs } from '@shared/assets/images/index.ts'

export const Zone = () => {
  const { user, addUserChatCount, subUserChatCount } = useAuthStore()
  const { users, chats } = useChatStore()
  const timer = useMemo(() => new Timeout(), [])
  const myId = useMemo(() => user?.id, [user?.id])
  const noChat = useMemo(() => user?.noChat, [user?.noChat])
  const { socket, isConnect, sendMove, sendChat } = useWebSocket()
  const [localMyX, setLocalMyX] = useState(-1)
  const [isChatting, setIsChatting] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [dropAnimation, setDropAnimation] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        e.preventDefault()
        if (noChat) {
          setIsChatting(false)
          setChatMessage('')
          alert('도배하셔서 30초간 채팅 금지요~')
          return
        }

        if (!isChatting) {
          setIsChatting(true)
        } else {
          const trimmed = chatMessage.trim()
          if (myId && trimmed) {
            const currentCount = addUserChatCount()

            timer.startTimeout(() => {
              subUserChatCount()
            }, MESSAGE_DELAY_TIME)

            sendChat(myId, trimmed, currentCount)
            setChatMessage('')

            timer.startTimeouts(() => {
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

      const clientWidth = 1300 - 80

      setLocalMyX((prevX) => {
        let newX = prevX

        if (e.key === 'ArrowLeft') newX -= 5
        else if (e.key === 'ArrowRight') newX += 5

        if (newX <= (noChat ? clientWidth - (200 + 240) : 0)) {
          newX = noChat ? clientWidth - (200 + 240) : 0
        }

        if (newX >= (noChat ? clientWidth - 200 : clientWidth)) {
          newX = noChat ? clientWidth - 200 : clientWidth
        }

        timer.startTimeout(() => {
          sendMove(myId, newX)
        }, MESSAGE_SEND_TIME)

        return newX
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [noChat, myId, socket, isConnect, sendMove])

  useEffect(() => {
    if (localMyX === -1) {
      const me = users.filter((user) => user.id === myId)[0]
      setLocalMyX(me ? me.position.x : -1)
      timer.startTimeouts(() => {
        setDropAnimation(false)
      }, 3000)
    }
  }, [users, isConnect])

  useEffect(() => {
    if (user) {
      setLocalMyX(user.position.x)
    }
  }, [user])

  return (
    <S.ZoneWrapper>
      <S.ZonePrison>
        <img src={Prison} alt={'감옥'} />
      </S.ZonePrison>
      <div>
        {users.map((user) => {
          const isMe = user.id === myId
          if (isMe && localMyX === -1) return <></>

          const x = isMe ? localMyX : user.position.x
          const hairImageUrl = hairs[`hair${user.hair}`]
          const message = chats[user.id]?.slice(-1)?.[0]

          return (
            <S.Character isMe={isMe} x={x} key={user.id} noChat={user?.noChat} first={dropAnimation}>
              {!!message && <ChatBubble key={message.id} message={message.message} />}
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
