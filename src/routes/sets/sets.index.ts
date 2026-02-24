import createRouter from '@/utils/create_router.js'
import * as routes from './sets.routes.js'
import * as handlers from './sets.handlers.js'

const setsRouter = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.oneByCode, handlers.oneByCode)
  .openapi(routes.create, handlers.create)

export default setsRouter
