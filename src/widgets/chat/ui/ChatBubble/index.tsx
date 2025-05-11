import * as S from './styled.ts'
import { useMemo } from 'react'

const COLORS = ['#ff6699', '#ffcc00', '#66ccff', '#99ff33', '#ff9933', '#cc66ff']

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

type ChatBubbleProps = {
  message: string
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const coloredMessage = useMemo(() => {
    return [...message].map((char, idx) => ({
      char,
      color: getRandomColor(),
      delay: idx * 0.2,
    }))
  }, [message])

  return (
    <S.Chat>
      {coloredMessage.map((item, i) => (
        <S.CharSpan
          key={`${item.char}-${i}-${message}`}
          delay={item.delay}
          style={{
            color: item.color,
            textShadow: `0 0 6px ${item.color}, 0 0 12px ${item.color}`,
          }}
        >
          {item.char}
        </S.CharSpan>
      ))}
    </S.Chat>
  )
}
