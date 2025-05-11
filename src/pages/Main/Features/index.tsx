import * as S from './styles.ts'
import { useChatStore } from '@features/chat/store/useChatStore.ts'
import { useAuthStore } from '@features/auth/store/useAuthStore.ts'
import { API_PORT, API_URL } from '@shared/config/env.ts'

export const Features = () => {
  const { chats } = useChatStore()
  const { logout } = useAuthStore()

  return (
    <S.Features>
      <S.FeatureChat>
        <S.Chats>
          {Object.values(chats).map((userChats) =>
            userChats.map((chat) => (
              <S.Chat key={`${chat.id}`}>
                <strong>익명의 사용자:</strong> {chat.message}
              </S.Chat>
            )),
          )}
        </S.Chats>
      </S.FeatureChat>

      <S.FeatureController>
        <S.DeleteButton
          onClick={async () => {
            if (!confirm('정말 모든 사용자를 삭제하시겠습니까?')) return

            try {
              const res = await fetch(`http://${API_URL}:${API_PORT}/clear-users`, {
                method: 'POST',
              })
              const result = await res.json()
              alert(result.status)
            } catch (error) {
              alert('삭제 실패: ' + (error as Error).message)
            }
          }}
        >
          모든 사용자 삭제
        </S.DeleteButton>
      </S.FeatureController>
      <S.FeatureController>
        <S.DeleteButton onClick={logout}>로그아웃</S.DeleteButton>
      </S.FeatureController>
    </S.Features>
  )
}
