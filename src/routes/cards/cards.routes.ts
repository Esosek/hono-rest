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
      type: z
        .enum(CardType)
        .optional()
        .openapi({ example: CardType.CREATURE, description: 'Filters cards by card type' }),
      rarity: z
        .enum(CardRarity)
        .optional()
        .openapi({ example: CardRarity.COMMON, description: 'Filters cards by rarity' }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(CardSchema).openapi({
            example: cards,
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

export type IListRoute = typeof list
