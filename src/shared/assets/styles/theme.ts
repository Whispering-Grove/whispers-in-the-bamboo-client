const colors = {
  base: {
    white: '#ffffff',
    black: '#1b1b1b',
  },
  primary: {
    500: '#3b82f6',
    opacity20: 'rgba(59,130,246,0.2)',
    opacity30: 'rgba(59,130,246,0.3)',
    opacity70: 'rgba(59,130,246,0.7)',
  },
  red: {
    100: '#ffcccc',
    500: '#ff7b7b',
    opacity70: 'rgba(255,123,123,0.7)',
  },
  gray: {
    100: '#f1f1f1',
    200: '#e9e9e9',
    400: '#b9b9b9',
    opacity10: 'rgba(0, 0, 0, 0.1)',
    opacity30: 'rgba(0, 0, 0, 0.3)',
    opacity50: 'rgba(241, 241, 241, 0.5)',
    opacity70: 'rgba(0, 0, 0, 0.7)',
  },
}

export const theme = {
  colors,
}

export type AppTheme = typeof theme
