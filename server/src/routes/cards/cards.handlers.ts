import type { RouteHandler } from '@hono/zod-openapi'
import type { ICreateRoute, IListRoute, IOnebyIdRoute } from './cards.routes.js'
import prisma from '../../prisma/prisma.js'
import log, { LogStatusEnum } from '../../logger.js'
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

export const oneById: RouteHandler<IOnebyIdRoute> = async (c) => {
  try {
    const { id } = c.req.valid('param')
    const card = await prisma.card.findUnique({ where: { id } })
    if (!card) {
      log('fetch card', LogStatusEnum.ERROR, `card id ${id} not found`)

      return c.json({ message: 'Card not found!' }, 404)
    }
    log('fetch card', LogStatusEnum.SUCCESS, `card ID: ${id}`)
    return c.json(card, 200)
  } catch (error) {
    log('fetch card', LogStatusEnum.ERROR, `failed with error ${getErrorMessage(error)}`)
    return c.json({ message: getErrorMessage(error) }, 500)
  }
}

export const create: RouteHandler<ICreateRoute> = async (c) => {
  const args = c.req.valid('json')
  try {
    const createdCard = await prisma.$transaction(async () => {
      await prisma.set.update({ where: { code: args.setCode }, data: { cardCount: { increment: 1 } } })
      return await prisma.card.create({ data: args })
    })

    log('create card', LogStatusEnum.SUCCESS, 'ID ' + createdCard.id.toString())
    return c.json(createdCard, 201)
  } catch (error) {
    log('create card', LogStatusEnum.ERROR, getErrorMessage(error))
    return c.json({ message: getErrorMessage(error) }, 500)
  }
}
