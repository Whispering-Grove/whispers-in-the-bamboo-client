import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray.opacity30};
  box-sizing: border-box;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.gray.opacity10};
  border-radius: 10px;
  overflow: hidden;
`
