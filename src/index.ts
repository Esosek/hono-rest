import { serve } from '@hono/node-server'

import config from './config.js'
import { configureOpenAPI } from './openapi.js'
import setsRouter from './routes/sets/sets.index.js'
import cardsRouter from './routes/cards/cards.index.js'
import createApp from './utils/create_app.js'

const app = createApp()

configureOpenAPI(app)

const routers = [setsRouter, cardsRouter] as const
routers.forEach((router) => app.route('/', router))

export type AppType = (typeof routers)[number]

serve(
  {
    fetch: app.fetch,
    port: config.port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
