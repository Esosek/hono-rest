import type { RouteHandler } from '@hono/zod-openapi'
import type { IListRoute } from './cards.routes.js'
import prisma from '@/prisma/prisma.js'
import log, { LogStatusEnum } from '@/logger.js'
import { getErrorMessage } from '../routes_utils.js'

export const list: RouteHandler<IListRoute> = async (c) => {
  try {
    const { set, type, rarity } = c.req.valid('query')
    const cards = await prisma.card.findMany({ where: { setCode: set?.toUpperCase(), type, rarity } })
    log('fetch cards', LogStatusEnum.SUCCESS, `filters: set=${set} type=${type} rarity=${rarity}`)
    return c.json(cards, 200)
  } catch (error) {
    log('fetch cards', LogStatusEnum.ERROR, getErrorMessage(error))
    return c.json({ message: getErrorMessage(error) }, 500)
  }
}
