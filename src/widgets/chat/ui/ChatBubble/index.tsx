import * as S from './styled.ts'
import { memo, useEffect, useRef, useState } from 'react'

const COLORS = ['#ff6699', '#ffcc00', '#66ccff', '#99ff33', '#ff9933', '#cc66ff']

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

type ChatBubbleProps = {
  message: string
}

export const ChatBubble = memo(({ message }: ChatBubbleProps) => {
  const baseBottom = 130
  const lineHeight = 30
  const [charList, setCharList] = useState<{ char: string; color: string; isNew: boolean }[]>([])
  const timers = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    setCharList([])

    const chars = [...message]
    chars.forEach((char, i) => {
      const t = setTimeout(() => {
        setCharList((prev) => [...prev, { char, color: getRandomColor(), isNew: true }])
      }, i * 300)

      timers.current.push(t)
    })

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [message])

  return (
    <S.Chat>
      {charList.map((item, idx, arr) => (
        <S.CharSpan
          key={`${item.char}-${idx}`}
          bottom={baseBottom + (arr.length - 1 - idx) * lineHeight}
          isNew={item.isNew}
          delay={0}
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
})
