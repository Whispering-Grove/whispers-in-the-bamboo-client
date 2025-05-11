import { User } from '@entities/user/model/types.ts'
import { API_PORT, API_URL } from '@shared/config/env.ts'

export const authUser = async (user: User) => {
  const res = await fetch(`http://${API_URL}:${API_PORT}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  const data = await res.json()

  if (data.error) {
    throw new Error(data.error)
  }

  return data
}

export const removeUser = (userId: string) => {
  navigator.sendBeacon(`http://${API_URL}:${API_PORT}/delete-user`, JSON.stringify({ userId }))
}
