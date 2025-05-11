import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'

const floatUp = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(20px) scale(0.9);
        filter: blur(2px);
    }
    30% {
        opacity: 1;
    }
    100% {
        opacity: 1;
        transform: translateX(-50%) translateY(0px) scale(1);
        filter: blur(0);
    }
`

export const Chat = styled.div`
  position: relative;
  width: 1px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  font-family: 'Luckiest Guy', 'Impact', sans-serif;
  font-size: 48px;
  font-weight: 900;
  z-index: 10;
`

export const CharSpan = styled.span<{
  bottom: number
  delay: number
  isNew: boolean
}>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${({ bottom }) => bottom}px;
  opacity: 1;
  transition: bottom 0.3s ease;

  ${({ isNew, delay }) =>
    isNew &&
    css`
      opacity: 0;
      animation: ${floatUp} 0.3s ease-out forwards;
      animation-delay: ${delay}s;
    `}
`
