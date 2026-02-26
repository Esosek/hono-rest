import z from 'zod'

type StatusCode = 400 | 404 | 500

export const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

const getErrorDescription = (code: StatusCode) => {
  switch (code) {
    case 400:
      return 'Invalid input error'
    case 404:
      return 'Not Found!'
    default:
      return 'Internal Server Error'
  }
}

export const getErrorResponse = (code: StatusCode, message: string) => ({
  content: {
    'application/json': {
      schema: z.object({ message: z.string() }).openapi({
        example: {
          message,
        },
      }),
    },
  },
  description: getErrorDescription(code),
})
