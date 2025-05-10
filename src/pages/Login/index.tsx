import * as S from '@pages/Login/styles.ts'
import { useAuthStore } from '@features/auth/store/useAuthStore'
import { useEffect, useId } from 'react'

export const Login = () => {
  const { login, isLoading, error } = useAuthStore()
  const id = useId()

  const handleLogin = async () => {
    await login(id)
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <S.Container>
      <S.Button onClick={handleLogin}>{isLoading ? '입장하는 중...' : '입장하기'}</S.Button>
    </S.Container>
  )
}
