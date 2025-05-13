import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

const dropToTop = keyframes`
  from {
    transform: translateY(-400px);
  }
  to {
    transform: translateY(0);
  }
`

export const Character = styled.div<{ isMe: boolean; x: number; noChat: boolean; first: boolean }>`
  position: absolute;
  max-width: 80px;
  height: 100px;
  display: flex;
  bottom: 50px;
  left: ${({ x }) => x}px;
  z-index: ${({ isMe }) => (isMe ? 1 : 0)};

  ${({ isMe }) =>
    isMe &&
    css`
      transition:
        left ${isMe ? '.1s' : '.3s'} ease-out,
        transform 0.5s ease-out;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 0 5px white);
      }
    `};

  ${({ first, noChat }) =>
    first && !noChat
      ? css`
          transition: none;
          transform: translateY(0);
          animation: ${dropToTop} 0.5s ease-out forwards;
          animation-iteration-count: 1;
        `
      : !first && noChat
        ? css`
            transition: none;
            transform: translateY(-400px);
          `
        : !first &&
          !noChat &&
          css`
            transition: none;
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
