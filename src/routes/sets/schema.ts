import z from 'zod'
import { SetCodeEnum } from '../../interfaces.js'

export const SetSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.enum(SetCodeEnum),
  cardCount: z.number(),
  mechanics: z.array(z.string()),
})
