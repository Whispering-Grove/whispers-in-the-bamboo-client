import styled from '@emotion/styled'

export const Chat = styled.div`
  position: absolute;
  bottom: 130px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: -30px;
  pointer-events: none;
  font-family: 'Luckiest Guy', 'Impact', sans-serif;
  font-size: 48px;
  font-weight: 900;
  z-index: 10;
`

export const CharSpan = styled.span<{ delay: number }>`
  display: inline-block;
  animation: floatUp 1s ease-out forwards;
  animation-delay: ${({ delay }) => delay}s;
  opacity: 0;

  @keyframes floatUp {
    0% {
      opacity: 0;
      transform: translateY(0px) scale(0.9);
      filter: blur(2px);
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-40px) scale(1.2);
      filter: blur(3px);
    }
  }
`
