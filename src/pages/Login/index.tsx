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
      position: { x: 0 },
      hair: Math.floor(Math.random() * 13) + 1,
      dress: Math.floor(Math.random() * 13) + 1,
    }

    await login(user)
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <S.Container>
      <S.Button onClick={handleLogin}>
        <S.EnterImg src={isLoading ? entering : enter} alt="입장하기" />
      </S.Button>
    </S.Container>
  )
}
