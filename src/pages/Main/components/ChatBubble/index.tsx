export const ChatBubble = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '130px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '6px 10px',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '10px',
        fontSize: '14px',
        maxWidth: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        zIndex: 10,
      }}
    >
      {message}
    </div>
  )
}
