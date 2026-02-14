import type { RouteHandler } from '@hono/zod-openapi'
import type { ICreateRoute, IListRoute, IOneByCodeRoute } from './sets.routes.js'
import log, { LogStatusEnum } from '@/logger.js'
import prisma from '@/prisma/prisma.js'
import { HTTPException } from 'hono/http-exception'

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

export const list: RouteHandler<IListRoute> = async (c) => {
  try {
    const sets = await prisma.set.findMany()
    log('fetch all sets', LogStatusEnum.SUCCESS)
    return c.json(
      sets.map((set) => ({ ...set, mechanics: stringToArray(set.mechanics) })),
      200,
    )
  } catch (error) {
    log('fetch all sets', LogStatusEnum.ERROR, getErrorMessage(error))
    return c.json({ message: getErrorMessage(error) }, 500)
  }
}

export const oneByCode: RouteHandler<IOneByCodeRoute> = async (c) => {
  const { code } = c.req.valid('param')
  try {
    const set = await prisma.set.findUnique({ where: { code: code.toUpperCase() } })

    if (!set) {
      log('fetch set by code', LogStatusEnum.ERROR, 'code ' + code + ' not found!')
      return c.json({ message: 'Set not found!' }, 404)
    }

    log('fetch set by code', LogStatusEnum.SUCCESS, 'code ' + code)
    return c.json({ ...set, mechanics: stringToArray(set.mechanics) }, 200)
  } catch (error) {
    log('fetch set by code', LogStatusEnum.ERROR, getErrorMessage(error))
    return c.json({ message: getErrorMessage(error) }, 500)
  }
}

const arrayToString = (arr: Array<string>, delimiter = '|'): string => arr.join(delimiter)
const stringToArray = (value: string, delimiter = '|'): Array<string> => value.split(delimiter)

export const create: RouteHandler<ICreateRoute> = async (c) => {
  const args = c.req.valid('json')
  try {
    const createdSet = await prisma.set.create({ data: { ...args, mechanics: arrayToString(args.mechanics) } })
    log('create set', LogStatusEnum.SUCCESS, 'ID ' + createdSet.id.toString())
    return c.json({ ...createdSet, mechanics: stringToArray(createdSet.mechanics) }, 201)
  } catch (error) {
    log('create set', LogStatusEnum.ERROR, getErrorMessage(error))
    return c.json({ message: getErrorMessage(error) }, 500)
  }
}
