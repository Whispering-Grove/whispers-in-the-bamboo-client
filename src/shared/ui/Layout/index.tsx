import * as S from '@shared/ui/Layout/styles.ts'
import { PropsWithChildren } from 'react'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <S.Container>
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.Container>
  )
}
