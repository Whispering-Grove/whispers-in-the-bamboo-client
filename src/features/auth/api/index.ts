import { User } from '@entities/user/model/types.ts'

export const authUser = async (user: User) => {
  const res = await fetch('http://localhost:3000/login', {
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
  navigator.sendBeacon('http://localhost:3000/delete-user', JSON.stringify({ userId }))
}
