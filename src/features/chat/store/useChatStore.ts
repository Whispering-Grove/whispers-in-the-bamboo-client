import { create } from 'zustand'
import { Chat, User } from '@entities/user/model/types.ts'
import { Timeout } from '@shared/lib/timer.ts'
import { MESSAGE_TIME } from '@features/chat/config/limit.ts'

interface ChatState {
  users: User[]
  chats: Record<string, Chat>
  timer: Timeout
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  setChats: (chats: Record<string, Chat>) => void
  addChat: (chat: Chat) => void
  removeChat: (id: string) => void
}

export const useChatStore = create<ChatState>()((set, get) => ({
  users: [],
  chats: {},
  timer: new Timeout(),

  setUsers: (users: User[]) => {
    set({ users })
  },

  addUser: (user: User) => {
    set((state) => ({ users: state.users.concat(user) }))
  },

  setChats: (chats: Record<string, Chat>) => {
    set({ chats })
  },

  addChat: (chat: Chat) => {
    const chats = get().chats
    set({ chats: { ...chats, [chat.userId]: chat } })

    const timer = get().timer

    timer.startTimeouts(() => {
      get().removeChat(chat.id)
    }, MESSAGE_TIME)
  },

  removeChat: (id: string) => {
    const chats = get().chats
    delete chats[id]
    set({ chats })
  },
}))
