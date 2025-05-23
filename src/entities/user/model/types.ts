export interface User {
  id: string
  hair: number
  dress: number
  position: { x: number }
  noChat: boolean
  chatCount: number
}

export interface Chat {
  id: string
  userId: string
  message: string
  createdAt: number
}
