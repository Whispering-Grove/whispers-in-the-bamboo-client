import '@emotion/react'
import { AppTheme } from '@shared/assets/styles/theme.ts'

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
