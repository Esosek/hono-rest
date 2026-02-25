import createRouter from '../../utils/create_router.js'
import * as routes from './cards.routes.js'
import * as handlers from './cards.handlers.js'

const cardsRouter = createRouter('/cards').openapi(routes.list, handlers.list).openapi(routes.oneById, handlers.oneById)
// .openapi(routes.create, handlers.create)

export default cardsRouter
