import type { RouteHandler } from '@hono/zod-openapi'
import type { ICreateRoute, IListRoute, IOneByIdRoute } from './sets.routes.js'
import { sets } from '@/data/sets.js'
import log, { LogStatusEnum } from '@/logger.js'

export const list: RouteHandler<IListRoute> = async (c) => {
  log('fetch all sets', LogStatusEnum.SUCCESS)
  return c.json(sets, 200)
}

export const oneById: RouteHandler<IOneByIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const found = sets.find((set) => set.id === id)
  log('fetch set by id', LogStatusEnum.SUCCESS, 'ID ' + id.toString())
  if (!found) return c.json({ message: 'Set not found!' }, 404)
  return c.json(found, 200)
}

export const create: RouteHandler<ICreateRoute> = async (c) => {
  const args = c.req.valid('json')
  const created = { id: sets.length + 1, ...args }
  sets.push({ id: created.id, ...args })
  log('create set', LogStatusEnum.SUCCESS, 'ID ' + created.id.toString())
  return c.json(created, 201)
}
