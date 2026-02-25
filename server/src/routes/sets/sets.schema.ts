import z from 'zod'

export const SetSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  cardCount: z.number(),
  mechanics: z.array(z.string()),
})

export const InputSetSchema = SetSchema.omit({ id: true })
