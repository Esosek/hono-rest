import { createRoute, z } from '@hono/zod-openapi'
import { sets } from '@/data/sets.js'

const SetSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  cardCount: z.number(),
  mechanics: z.array(z.string()),
})

const InputSetSchema = SetSchema.omit({ id: true })

const tags = ['Sets']

export const list = createRoute({
  tags,
  method: 'get',
  path: '/',
  description: 'Fetches all sets',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(SetSchema).openapi({
            example: sets,
          }),
        },
      },
      description: 'All fetched sets',
    },
  },
})

export const oneById = createRoute({
  tags,
  method: 'get',
  path: '/{id}',
  description: 'Fetch set by ID',
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

export const create = createRoute({
  tags,
  method: 'post',
  path: '/',
  description: 'Creates new set',
  request: {
    body: {
      content: {
        'application/json': {
          schema: InputSetSchema.openapi({
            example: {
              name: sets[0].name,
              code: sets[0].code,
              cardCount: sets[0].cardCount,
              mechanics: sets[0].mechanics,
            },
          }),
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: SetSchema.openapi({
            example: sets[0],
          }),
        },
      },
      description: 'Created set',
    },
    400: {
      content: {
        'application/json': {
          schema: z.object({ message: z.string() }).openapi({
            example: {
              message: 'Malformed JSON in request body',
            },
          }),
        },
      },
      description: 'Invalid input error',
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
    500: {
      content: {
        'application/json': {
          schema: z.object({ message: z.string() }).openapi({
            example: {
              message:
                '\nInvalid `prisma.set.create()` invocation in\n/var/home/esosek/Documents/WebDev/hono-rest/src/routes/sets/sets.handlers.ts:26:38\n\n  23 export const create: RouteHandler<ICreateRoute> = async (c) => {\n  24   const args = c.req.valid("json")\n  25   try {\n→ 26     const created = await prisma.set.create({\n           data: {\n             name: \"Lorwyn Eclipsed\",\n             code: \"ECL\",\n             cardCount: 274,\n             mechanics: [\n               \"Blight\",\n               \"Vivid\",\n               \"Affinity\",\n               \"Basic\",\n               \"Landcycling\",\n               \"Behold\",\n               \"Changeling\",\n               \"Conspire\",\n               \"Convoke\",\n               \"Evoke\",\n               \"Flashback\",\n               \"Persist\",\n               \"Proliferate\",\n               \"Transform\",\n               \"Wither\"\n             ]\n             ~~~~~~~~~~~~~~~\n           }\n         })\n\nArgument `mechanics`: Invalid value provided. Expected String, provided (String, String, String, String, String, String, String, String, String, String, String, String, String, String, String).',
            },
          }),
        },
      },
      description: 'Internal Server Error',
    },
  },
})

export type IListRoute = typeof list
export type IOneByIdRoute = typeof oneById
export type ICreateRoute = typeof create
