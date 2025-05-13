import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'

const floatSmokeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.9) rotate(0deg);
    filter: blur(4px);
  }
  40% {
    opacity: 0.7;
    transform: translateX(-50%) translateY(-10px) scale(1.05) rotate(-2deg);
    filter: blur(1px);
  }
  80% {
    opacity: 0.7;
    transform: translateX(-50%) translateY(-20px) scale(1.1) rotate(2deg);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-40px) scale(1.15) rotate(0deg);
    filter: blur(1px);
  }
`

export const Chat = styled.div`
  position: relative;
  width: 1px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  font-family: 'Luckiest Guy', 'Impact', sans-serif;
  font-size: 36px;
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
  transition: bottom 0.3s ease-in-out;

  ${({ isNew, delay }) =>
    isNew &&
    css`
      opacity: 0;
      animation: ${floatSmokeUp} 1.2s ease-out forwards;
      animation-delay: ${delay}s;
    `}
`
