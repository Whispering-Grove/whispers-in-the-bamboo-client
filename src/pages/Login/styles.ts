import titleBackground from '@shared/assets/images/title.png'
import styled from '@emotion/styled'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1300px;
  background-image: url(${titleBackground});
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100% 100%;
`

export const Button = styled.button`
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  width: min(max(20vw, 150px), 250px);
  font-size: 24px;
  border-radius: 7vw;
  padding: 20px;
`

export const EnterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
