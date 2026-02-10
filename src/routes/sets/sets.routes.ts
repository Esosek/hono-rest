import { createRoute, z } from '@hono/zod-openapi'
import { SetCodeEnum } from '@/interfaces.js'
import { sets } from '@/data/sets.js'

const SetSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.enum(SetCodeEnum),
  cardCount: z.number(),
  mechanics: z.array(z.string()),
})

const tags = ['Sets']

export const list = createRoute({
  tags,
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(SetSchema).openapi({
            example: sets,
          }),
        },
      },
      description: 'List all sets',
    },
  },
})

export const oneById = createRoute({
  tags,
  method: 'get',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.coerce.number(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SetSchema.openapi({ example: sets[0] }),
        },
      },
      description: 'The requested set',
    },
    404: {
      content: {
        'application/json': {
          schema: z
            .object({
              message: z.string(),
            })
            .openapi({ example: { message: 'Set not found!' } }),
        },
      },
      description: 'Set not found',
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
  },
})

export type IListRoute = typeof list
export type IOneByIdRoute = typeof oneById
