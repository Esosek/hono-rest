import z from 'zod'

export const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

export const internalServerErrorResponse = (message: string) => ({
  content: {
    'application/json': {
      schema: z.object({ message: z.string() }).openapi({
        example: {
          message,
        },
      }),
    },
  },
  description: 'Internal Server Error',
})
