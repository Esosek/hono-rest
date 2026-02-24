import { serve } from '@hono/node-server'

import config from './config.js'
import { configureOpenAPI } from './openapi.js'
import setsRouter from './routes/sets/sets.index.js'
import cardsRouter from './routes/cards/cards.index.js'
import createApp from './utils/create_app.js'

const app = createApp().route('/sets', setsRouter).route('/cards', cardsRouter)

configureOpenAPI(app)

export type AppType = typeof app

serve(
  {
    fetch: app.fetch,
    port: config.port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
