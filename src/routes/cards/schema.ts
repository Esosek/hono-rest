import z from 'zod'
import { SetCodeEnum, ColorEnum, RarityEnum, CardTypeEnum } from '../../interfaces.js'

export const CardSchema = z.object({
  id: z.number(),
  name: z.string(),
  setCode: z.enum(SetCodeEnum),
  color: z.enum(ColorEnum),
  rarity: z.enum(RarityEnum),
  type: z.enum(CardTypeEnum),
  power: z.number().optional(),
  toughness: z.number().optional(),
})
