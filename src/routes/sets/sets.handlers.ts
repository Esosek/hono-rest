import type { RouteHandler } from '@hono/zod-openapi'
import type { ICreateRoute, IListRoute, IOneByIdRoute } from './sets.routes.js'
import { sets } from '@/data/sets.js'
import log, { LogStatusEnum } from '@/logger.js'
import prisma from '@/prisma/prisma.js'

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

const arrayToString = (arr: Array<string>, delimiter = '|'): string => arr.join(delimiter)
const stringToArray = (value: string, delimiter = '|'): Array<string> => value.split(delimiter)

export const create: RouteHandler<ICreateRoute> = async (c) => {
  const args = c.req.valid('json')
  try {
    const created = await prisma.set.create({ data: { ...args, mechanics: arrayToString(args.mechanics) } })
    log('create set', LogStatusEnum.SUCCESS, 'ID ' + created.id.toString())
    return c.json({ ...created, mechanics: stringToArray(created.mechanics) }, 201)
  } catch (error) {
    return c.json({ message: error instanceof Error ? error.message : String(error) }, 500)
  }
}
