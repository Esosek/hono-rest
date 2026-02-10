import type { RouteHandler } from '@hono/zod-openapi'
import type { IListRoute, IOneByIdRoute } from './sets.routes.js'
import { sets } from '@/data/sets.js'

export const list: RouteHandler<IListRoute> = async (c) => c.json(sets, 200)

export const oneByOne: RouteHandler<IOneByIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const found = sets.find((set) => set.id === id)
  if (!found) return c.json({ message: 'Set not found!' }, 404)
  return c.json(found, 200)
}
