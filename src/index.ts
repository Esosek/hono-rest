import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'
import { HTTPException } from 'hono/http-exception'

import config from './config.js'
import { configureOpenAPI } from './openapi.js'
import { logger as customLogger } from '@/logger.js'
import createRouter from './create_router.js'
import setsRouter from './routes/sets/sets.index.js'
import cardsRouter from './routes/cards/cards.index.js'

const app = createRouter(config.apiPrefix)
app.use(logger(customLogger))

const routers = [setsRouter, cardsRouter]
routers.forEach((router) => app.route('/', router))

configureOpenAPI(app)

app.notFound((c) => c.json({ message: 'Not Found!' }, 404))
app.onError((err, c) => c.json({ message: err.message }, err instanceof HTTPException ? err.status : 500))

serve(
  {
    fetch: app.fetch,
    port: config.port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
