import { hc } from 'hono/client'
import type { AppType } from './index.js'

const client = hc<AppType>('http://localhost:3000')

export default client
