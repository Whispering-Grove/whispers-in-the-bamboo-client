import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Character = styled.div<{ isMe: boolean; x: number }>`
  position: absolute;
  width: 40px;
  display: flex;
  bottom: 100px;
  left: ${({ x }) => x}px;
  z-index: ${({ isMe }) => (isMe ? 1 : 0)};
  transition: left ${({ isMe }) => (isMe ? '.1s' : '.3s')} ease-out;

  ${({ isMe }) =>
    isMe &&
    css`
      border: 2px solid #fff;
    `}
`
