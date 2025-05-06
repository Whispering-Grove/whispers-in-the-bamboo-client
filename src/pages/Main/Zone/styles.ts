import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Character = styled.div<{ isMe: boolean; x: number }>`
  position: absolute;
  height: 70px;
  display: flex;
  bottom: 100px;
  left: ${({ x }) => x}px;
  z-index: ${({ isMe }) => (isMe ? 1 : 0)};
  transition: left ${({ isMe }) => (isMe ? '.1s' : '.3s')} ease-out;

  ${({ isMe }) =>
    isMe &&
    css`
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 0 5px white);
      }
    `}
`
