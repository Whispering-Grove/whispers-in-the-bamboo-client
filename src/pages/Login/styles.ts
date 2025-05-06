import titleBackground from '@shared/assets/images/title.png'
import styled from '@emotion/styled'

export const Container = styled.div`
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
  min-width: 700px;
  max-width: 1280px;
  min-height: 393px;
  max-height: 720px;
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
  background-color: ${({ theme }) => theme.colors.red['500']};
  width: 15vw;
  height: 7vw;
  font-size: 24px;
  border-radius: 7vw;
`
