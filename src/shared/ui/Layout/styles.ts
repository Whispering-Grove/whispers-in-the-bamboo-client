import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray.opacity30};
  box-sizing: border-box;
`

export const ContentWrapper = styled.div`
  flex: 1;
`
