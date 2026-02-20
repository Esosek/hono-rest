import { createRoute, z } from '@hono/zod-openapi'
import { CardSchema } from './cards.schema.js'
import { cards } from '@/data/cards.js'
import { internalServerErrorResponse } from '../routes_utils.js'
import { CardRarity, CardType } from '@/generated/prisma/enums.js'

const tags = ['Cards']

export const list = createRoute({
  tags,
  method: 'get',
  path: '/',
  description: 'Fetches all cards',
  request: {
    query: z.object({
      set: z.string().optional().openapi({ example: 'ECL', description: 'Filters cards by set code' }),
      type: z.enum(CardType).optional().openapi({ description: 'Filters cards by card type' }),
      rarity: z.enum(CardRarity).optional().openapi({ description: 'Filters cards by rarity' }),
      limit: z.coerce.number().optional().openapi({ example: 5, description: 'Number of cards per page' }),
      offset: z.coerce.number().optional().openapi({ example: 0, description: 'Offset for pagination' }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            total: z.number().openapi({ example: 15, description: 'Total number of cards' }),
            limit: z.number().openapi({ example: 5 }),
            offset: z.number().openapi({ example: 0 }),
            filters: z.object({
              set: z.string().optional().openapi({ example: 'FDN' }),
              type: z.enum(CardType).optional(),
              rarity: z.enum(CardRarity).optional(),
            }),
            currentPage: z.number().openapi({ example: 1 }),
            data: z.array(CardSchema).openapi({
              example: cards.slice(0, 5),
            }),
          }),
        },
      },
      description: 'All fetched cards',
    },
    400: {
      content: {
        'application/json': {
          schema: z
            .object({
              success: z.boolean(),
              error: z.object({
                name: z.string(),
                mesage: z.string(),
              }),
            })
            .openapi({
              example: {
                success: false,
                error: {
                  name: 'ZodError',
                  message:
                    '[\n  {\n    "code": "invalid_value",\n    "values": [\n      "CREATURE",\n      "INSTANT",\n      "SORCERY",\n      "LAND",\n      "ARTIFACT",\n      "ENCHANTMENT"\n    ],\n    "path": [\n      "type"\n    ],\n    "message": "Invalid option: expected one of \\"CREATURE\\"|\\"INSTANT\\"|\\"SORCERY\\"|\\"LAND\\"|\\"ARTIFACT\\"|\\"ENCHANTMENT\\""\n  },\n  {\n    "code": "invalid_value",\n    "values": [\n      "COMMON",\n      "UNCOMMON",\n      "RARE",\n      "MYTHIC"\n    ],\n    "path": [\n      "rarity"\n    ],\n    "message": "Invalid option: expected one of \\"COMMON\\"|\\"UNCOMMON\\"|\\"RARE\\"|\\"MYTHIC\\""\n  }\n]',
                },
              },
            }),
        },
      },
      description: 'Bad Request',
    },
    500: internalServerErrorResponse(''),
  },
})

export const oneById = createRoute({
  tags,
  path: '/{id}',
  method: 'get',
  description: 'Get card by ID',
  request: {
    params: z.object({ id: z.coerce.number().openapi({ example: 1 }) }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CardSchema.openapi({ example: cards[0] }),
        },
      },
      description: 'The requested card',
    },
    404: {
      content: {
        'application/json': {
          schema: z
            .object({
              message: z.string(),
            })
            .openapi({ example: { message: 'Card not found!' } }),
        },
      },
      description: 'Card not found',
    },
    422: {
      content: {
        'application/json': {
          schema: z
            .object({
              success: z.boolean(),
              error: z.object({
                name: z.string(),
                mesage: z.string(),
              }),
            })
            .openapi({
              example: {
                success: false,
                error: {
                  name: 'ZodError',
                  message:
                    '[\n  {\n    "expected": "number",\n    "code": "invalid_type",\n    "received": "NaN",\n    "path": [\n      "id"\n    ],\n    "message": "Invalid input: expected number, received NaN"\n  }\n]',
                },
              },
            }),
        },
      },
      description: 'Validation error',
    },
    500: internalServerErrorResponse(
      '\nInvalid `prisma.card.findUnique()` invocation in\n/var/home/esosek/Documents/WebDev/hono-rest/src/routes/cards/cards.handlers.ts:26:34\n\n  23 export const oneById: RouteHandler<IOneByIdRoute> = async (c) => {\n  24   const { id } = c.req.valid(\'param\')\n  25   try {\n→ 26     const set = await prisma.set.findUnique({\n           where: ""\n                  ~~\n         })\n\nArgument `where`: Invalid value provided. Expected SetWhereUniqueInput, provided String.',
    ),
  },
})

export type IListRoute = typeof list
export type IOnebyIdRoute = typeof oneById
