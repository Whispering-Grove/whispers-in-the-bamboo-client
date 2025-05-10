import { create } from 'zustand'
import { Chat, User } from '@entities/user/model/types.ts'
import { Timeout } from '@shared/lib/timer.ts'
import { MESSAGE_TIME } from '@features/chat/config/limit.ts'

interface ChatState {
  users: User[]
  chats: Record<string, Chat[]>
  timer: Timeout
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  addChat: (chat: Chat) => void
  removeChat: (userId: string, chatId: string) => void
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

  addChat: (chat: Chat) => {
    const chats = get().chats
    const userChats = (chats[chat.userId] ?? [])?.concat(chat)
    set({ chats: { ...chats, [chat.userId]: userChats } })

    const timer = get().timer

    timer.startTimeouts(() => {
      get().removeChat(chat.userId, chat.id)
    }, MESSAGE_TIME)
  },

  removeChat: (userId: string, chatId: string) => {
    const chats = get().chats
    const userChats = chats[userId].filter((chat) => chat.id !== chatId)
    set({ chats: { ...chats, [userId]: userChats } })
  },
}))
