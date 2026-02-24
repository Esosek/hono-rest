import { OpenAPIHono } from '@hono/zod-openapi'

const createRouter = () => new OpenAPIHono({ strict: false })

export default createRouter
