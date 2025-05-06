import { createContext, useContext, useEffect, useRef, useState } from 'react'

export type User = {
  id: string
  hair: number
  dress: number
  position: { x: number }
}

interface WebSocketContextValue {
  socket: WebSocket | null
  myId: string | null
  users: User[]
  sendMove: (x: number) => void
  sendChat: (message: string) => void
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined)

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<WebSocket | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [myId, setMyId] = useState<string | null>(null)

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

  const sendMove = (x: number) => {
    if (!myId || socketRef.current?.readyState !== WebSocket.OPEN) return
    socketRef.current.send(JSON.stringify({ type: 'move', payload: { id: myId, x } }))
  }

  const sendChat = (message: string) => {
    if (!myId || socketRef.current?.readyState !== WebSocket.OPEN) return
    socketRef.current.send(JSON.stringify({ type: 'chat', payload: { id: myId, message } }))
  }

  return (
    <WebSocketContext.Provider value={{ socket: socketRef.current, myId, users, sendMove, sendChat }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) throw new Error('useWebSocket must be used within WebSocketProvider')
  return context
}
