import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'

const floatSmokeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.9) rotate(0deg);
    filter: blur(2px);
  }
  25% {
    transform: translateX(-52%) translateY(-5px) scale(1) rotate(-3deg);
  }
  50% {
    opacity: 0.8;
    transform: translateX(-48%) translateY(-15px) scale(1.05) rotate(3deg);
    filter: blur(0px);
  }
  75% {
    transform: translateX(-51%) translateY(-30px) scale(1.1) rotate(-2deg);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-45px) scale(1.15) rotate(0deg);
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
      animation: ${floatSmokeUp} 3s ease-in-out forwards;
      animation-delay: ${delay}s;
    `}
`
