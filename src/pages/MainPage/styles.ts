import styled from '@emotion/styled'

export const Character = styled.div<{ isMe: boolean; x: number }>`
  position: absolute;
  bottom: 250px;
  left: calc(50% + ${({ x }) => x + 200}px);
  display: flex;
  width: 40px;
  height: 40px;
  background-color: ${({ isMe }) => (isMe ? 'blue' : 'gray')};
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  color: #fff;
  transition: left 0.1s ease-out;
  flex-direction: column;
  z-index: ${({ isMe }) => (isMe ? 1 : 0)};
`
