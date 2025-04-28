export interface User {
  id: string
  position: number
  hair: number
  dress: number
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null

  // actions
  setUser: (user: User | null) => void
  login: (id: string) => Promise<void>
  logout: () => void
}
