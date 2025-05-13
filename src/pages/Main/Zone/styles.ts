import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Character = styled.div<{ isMe: boolean; x: number; noChat: boolean }>`
  position: absolute;
  max-width: 80px;
  height: 100px;
  display: flex;
  bottom: 50px;
  top: ${({ noChat }) => (noChat ? '240px' : 'initial')};
  left: ${({ x }) => x}px;
  z-index: ${({ isMe }) => (isMe ? 1 : 0)};
  transition: left ${({ isMe, noChat }) => (isMe ? '.1s' : noChat ? '.0s' : '.3s')} ease-out;

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

export const ZoneWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1300px;
`

export const ZonePrison = styled.div`
  position: absolute;
  top: 0;
  right: 200px;
  z-index: 10;
  width: 350px;
`
