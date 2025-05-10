import { createContext, PropsWithChildren, useContext, useRef } from 'react'
import { useChatStore } from '@features/chat/store/useChatStore.ts'

const WebSocketContext = createContext<ReturnType<typeof useSocketState> | undefined>(undefined)

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const state = useSocketState()

  return <WebSocketContext.Provider value={state}>{children}</WebSocketContext.Provider>
}

const useSocketState = () => {
  const { setUsers } = useChatStore()
  const socketRef = useRef<WebSocket | null>(null)

  const connect = (userId: string) => {
    if (socketRef.current) return

    const socket = new WebSocket(`ws://localhost:3000?userId=${userId}`)
    socketRef.current = socket

    socket.onopen = () => {
      console.log('WebSocket connected')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'update-positions') {
        setUsers(data.payload)
      }
    }
  }

  const disconnect = () => {
    socketRef.current?.close()
  }

  const sendMove = (userId: string, x: number) => {
    if (userId || socketRef.current?.readyState !== WebSocket.OPEN) return
    socketRef.current.send(JSON.stringify({ type: 'move', payload: { id: userId, x } }))
  }

  const sendChat = (userId: string, message: string) => {
    if (userId || socketRef.current?.readyState !== WebSocket.OPEN) return
    socketRef.current.send(JSON.stringify({ type: 'chat', payload: { id: userId, message } }))
  }

  return { socket: socketRef.current, connect, disconnect, sendMove, sendChat }
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) throw new Error('useWebSocket must be used within WebSocketProvider')
  return context
}
