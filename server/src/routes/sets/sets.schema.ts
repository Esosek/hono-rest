import z from 'zod'

export const SetSchema = z.object({
  id: z.number(),
  name: z.string().min(3),
  code: z.string().min(1).max(3),
  cardCount: z.number().nonnegative().max(9999),
  mechanics: z.array(z.string()).nonempty(),
})

export const InputSetSchema = SetSchema.omit({ id: true })
