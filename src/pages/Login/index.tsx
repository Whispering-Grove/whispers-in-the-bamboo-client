import * as S from '@pages/Login/styles.ts'
import { useAuthStore } from '@features/auth/store/useAuthStore'
import { useEffect } from 'react'
import enter from '@shared/assets/images/enter.png'
import entering from '@shared/assets/images/entering.png'

export const Login = () => {
  const { login, isLoading, error } = useAuthStore()

  const handleLogin = async () => {
    const user = {
      id: `${new Date().getTime()}_${Math.floor(Math.random() * 9000) + 1000}`,
      position: { x: Math.floor(Math.random() * (1200 - 100 + 1)) + 100 },
      hair: Math.floor(Math.random() * 13) + 1,
      dress: Math.floor(Math.random() * 13) + 1,
      noChat: false,
      chatCount: 0,
    }

    await login(user)
  }

  useEffect(() => {
    const handleEnter = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleLogin()
      }
    }

    window.addEventListener('keyup', handleEnter)

    return () => {
      window.removeEventListener('keyup', handleEnter)
    }
  }, [])

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <S.Container>
      <S.Button type={'submit'} onClick={handleLogin}>
        <S.EnterImg src={isLoading ? entering : enter} alt="입장하기" />
      </S.Button>
    </S.Container>
  )
}
