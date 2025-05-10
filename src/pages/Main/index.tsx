import { Features } from '@pages/Main/Features'
import { Zone } from '@pages/Main/Zone'
import * as S from './styles.ts'

export const Main = () => {
  return (
    <S.Container>
      <Features />
      <Zone />
    </S.Container>
  )
}
