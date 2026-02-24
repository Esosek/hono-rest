import { logger as customLogger } from '@/logger.js'
import { type IConfig } from '@/config.js'
import createRouter from './create_router.js'
import { logger } from 'hono/logger'
import { HTTPException } from 'hono/http-exception'

const createApp = (config: IConfig) => {
  const app = createRouter(config.apiPrefix)
  app.use(logger(customLogger))

  app.notFound((c) => c.json({ message: 'Not Found! - ' + c.req.path }, 404))
  app.onError((err, c) => c.json({ message: err.message }, err instanceof HTTPException ? err.status : 500))

  return app
}

export default createApp
