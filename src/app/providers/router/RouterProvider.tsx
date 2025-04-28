import { useRoutes } from 'react-router-dom'
import { routerConfig } from '@app/providers/router/config.tsx'

export const RouterProvider = () => {
  const element = useRoutes(routerConfig)
  return <>{element}</>
}
