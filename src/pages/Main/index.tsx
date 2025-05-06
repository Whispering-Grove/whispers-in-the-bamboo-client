import { Features } from '@pages/Main/components/Features'
import { Zone } from '@pages/Main/components/Zone'

export const Main = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Features />
      <Zone />
    </div>
  )
}
