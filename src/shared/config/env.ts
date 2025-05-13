const wsHost = import.meta.env.VITE_WS_HOST
const host = import.meta.env.VITE_HOST
const api = import.meta.env.VITE_API_URL
const port = import.meta.env.VITE_API_PORT ? ':' + import.meta.env.VITE_API_PORT : ''
export const API_URL = `${host}://${api}${port}`
export const WS_URL = `${wsHost}://${api}${port}`
