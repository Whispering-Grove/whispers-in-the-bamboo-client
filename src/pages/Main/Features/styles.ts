import styled from '@emotion/styled'

export const Features = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 20px;
  left: 20px;
  z-index: 1;
  gap: 10px;
`

export const FeatureMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const FeatureController = styled.div``

export const FeatureChat = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  border-radius: 6px;
`
export const Chats = styled.ul``
export const Chat = styled.li`
  color: #fff;
  font-size: 14px;
`

export const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #ff4d4f;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
`
