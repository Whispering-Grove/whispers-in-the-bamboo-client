import { createContext, PropsWithChildren, useContext, useRef, useState } from 'react'
import { useChatStore } from '@features/chat/store/useChatStore.ts'

const WebSocketContext = createContext<ReturnType<typeof useSocketState> | undefined>(undefined)

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const state = useSocketState()

  return <WebSocketContext.Provider value={state}>{children}</WebSocketContext.Provider>
}

const useSocketState = () => {
  const { setUsers, addChat } = useChatStore()
  const socketRef = useRef<WebSocket | null>(null)
  const [isConnect, setConnect] = useState(false)

  const connect = (userId: string) => {
    if (socketRef.current) return

    const socket = new WebSocket(`ws://localhost:3000?userId=${userId}`)
    socketRef.current = socket

    socket.onopen = () => {
      console.log('WebSocket connected')
      setConnect(socket.readyState === WebSocket.OPEN)
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'update-positions') {
        setUsers(data.payload)
      }

      if (data.type === 'chat') {
        addChat(data.payload)
      }
    }
  }

  const disconnect = () => {
    socketRef.current?.close()
    setConnect(socketRef.current?.readyState === WebSocket.CLOSED)
  }

  const sendMove = (userId: string, x: number) => {
    socketRef.current?.send(JSON.stringify({ type: 'move', payload: { id: userId, x } }))
  }

  const sendChat = (userId: string, message: string) => {
    socketRef.current?.send(JSON.stringify({ type: 'chat', payload: { id: userId, message } }))
  }

  return { socket: socketRef.current, connect, disconnect, sendMove, sendChat, isConnect }
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) throw new Error('useWebSocket must be used within WebSocketProvider')
  return context
}
