import { create } from 'zustand'
import { authUser, removeUser } from '@features/auth/api'
import { User } from '@entities/user/model/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null

  // actions
  setUser: (user: User | null) => void
  addUserChatCount: () => number
  subUserChatCount: () => void
  login: (user: User) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user: User | null) => {
    set({ user })
  },

  addUserChatCount: () => {
    const user = get().user

    if (user) {
      user.chatCount += 1
    }

    return user?.chatCount ?? 0
  },

  subUserChatCount: () => {
    const user = get().user

    if (user) {
      user.chatCount -= 1
    }
  },

  login: async (user: User) => {
    set({ isLoading: true, error: null })
    try {
      await authUser(user)
      set({ user, isLoading: false })
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message || '로그인 실패', isLoading: false })
      }
    }
  },

  logout: () => {
    const userId = get().user?.id

    if (userId) {
      removeUser(userId)
    }

    set({ user: null })
  },
}))
