import type { RouteHandler } from '@hono/zod-openapi'
import type { IListRoute } from './cards.routes.js'
import prisma from '@/prisma/prisma.js'
import log, { LogStatusEnum } from '@/logger.js'
import { getErrorMessage } from '../routes_utils.js'

const DEFAULT_LIMIT = 10
const getCurrentPage = (limit?: number, offset?: number) => (offset ?? 0) / (limit ?? DEFAULT_LIMIT)

export const list: RouteHandler<IListRoute> = async (c) => {
  try {
    const { set, type, rarity, limit, offset } = c.req.valid('query')

    const [cards, total] = await Promise.all([
      prisma.card.findMany({
        where: { setCode: set?.toUpperCase(), type, rarity },
        take: limit ?? DEFAULT_LIMIT,
        skip: offset,
      }),
      prisma.card.count({ where: { setCode: set?.toUpperCase(), type, rarity } }),
    ])

    log(
      'fetch cards',
      LogStatusEnum.SUCCESS,
      `filters: set=${set} type=${type} rarity=${rarity}, pagination: limit=${limit} offset=${offset}`,
    )
    const filters = {
      set: set?.toUpperCase(),
      type,
      rarity,
    }
    return c.json(
      {
        total,
        currentPage: getCurrentPage(limit, offset),
        limit: limit ?? DEFAULT_LIMIT,
        offset: offset ?? 0,
        filters,
        data: cards,
      },
      200,
    )
  } catch (error) {
    log('fetch cards', LogStatusEnum.ERROR, getErrorMessage(error))
    return c.json({ message: getErrorMessage(error) }, 500)
  }
}
