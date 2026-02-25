import { logger } from 'hono/logger'
import { HTTPException } from 'hono/http-exception'
import { cors } from 'hono/cors'

import createRouter from './create_router.js'
import { logger as customLogger } from '../logger.js'
import config from '@/config.js'

const createApp = () => {
  const app = createRouter()
  app.use(
    cors({
      origin: config.clientUrl,
    }),
  )
  app.use(logger(customLogger))

  app.notFound((c) => c.json({ message: 'Not Found! - ' + c.req.path }, 404))
  app.onError((err, c) => c.json({ message: err.message }, err instanceof HTTPException ? err.status : 500))

  return app
}

export default createApp
