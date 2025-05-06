import styled from '@emotion/styled'

export const Character = styled.div<{ isMe: boolean; x: number }>`
  position: absolute;
  bottom: 250px;
  left: ${({ x }) => x}px;
  display: flex;
  width: 40px;
  height: 40px;
  background-color: ${({ isMe }) => (isMe ? 'blue' : 'gray')};
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  color: #fff;
  transition: left ${({ isMe }) => (isMe ? '.1s' : '.3s')} ease-out;
  flex-direction: column;
  z-index: ${({ isMe }) => (isMe ? 1 : 0)};
`
