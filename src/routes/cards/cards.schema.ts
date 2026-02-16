import z from 'zod'
import { CardColor, CardRarity, CardType } from '@/generated/prisma/enums.js'

export const CardSchema = z.object({
  id: z.number(),
  name: z.string(),
  setCode: z.string(),
  color: z.enum(CardColor),
  rarity: z.enum(CardRarity),
  type: z.enum(CardType),
  power: z.number().nullable(),
  toughness: z.number().nullable(),
})

export const InputCardSchema = CardSchema.omit({ id: true })
