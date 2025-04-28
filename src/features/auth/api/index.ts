import { User } from '@features/auth/types'

export const authUser = async (user: User) => {
  try {
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
  } catch (err) {
    throw err
  }
}
