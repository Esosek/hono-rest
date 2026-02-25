import { logger as customLogger } from '../logger.js'
import createRouter from './create_router.js'
import { logger } from 'hono/logger'
import { HTTPException } from 'hono/http-exception'

const createApp = () => {
  const app = createRouter()
  app.use(logger(customLogger))

  app.notFound((c) => c.json({ message: 'Not Found! - ' + c.req.path }, 404))
  app.onError((err, c) => c.json({ message: err.message }, err instanceof HTTPException ? err.status : 500))

  return app
}

export default createApp
