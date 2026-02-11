import { serve } from '@hono/node-server'

import setsRouter from './routes/sets/sets.index.js'
import createRouter from './create_router.js'
import { configureOpenAPI } from './openapi.js'
import config from './config.js'

const app = createRouter(config.apiPrefix)

const routers = [setsRouter]
routers.forEach((router) => app.route('/', router))

configureOpenAPI(app)

app.notFound((c) => c.json({ message: 'Endpoint not Found - ' + c.req.path }, 404))

serve(
  {
    fetch: app.fetch,
    port: config.port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
