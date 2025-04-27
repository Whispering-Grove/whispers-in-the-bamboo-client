import { ReactNode } from 'react'
import * as S from '@/components/shared/Layout/styles.ts'

type LayoutProps = {
  children: {
    main: ReactNode
  }
}

const Layout = ({ children }: LayoutProps) => {
  const { main } = children

  return (
    <S.Container>
      <S.ContentWrapper>{main}</S.ContentWrapper>
    </S.Container>
  )
}

export default Layout
