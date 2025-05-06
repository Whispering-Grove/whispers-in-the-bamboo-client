import { Features } from 'src/pages/Main/Features'
import { Zone } from 'src/pages/Main/Zone'
import * as S from './styles.ts'

export const Main = () => {
  return (
    <S.Container>
      <Features />
      <Zone />
    </S.Container>
  )
}
