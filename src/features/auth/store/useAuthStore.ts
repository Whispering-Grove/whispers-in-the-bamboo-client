import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AuthState, User } from '@features/auth/types'
import { authUser } from '@features/auth/api'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user: User | null) => {
        set({ user })
      },

      login: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          const user = { id, position: 0, hair: 0, dress: 0 }
          await authUser(user)
          set({ user, isLoading: false })
        } catch (err: unknown) {
          if (err instanceof Error) {
            set({ error: err.message || '로그인 실패', isLoading: false })
          }
        }
      },

      logout: () => {
        set({ user: null })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
