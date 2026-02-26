export type ISet = {
  id: number
  name: string
  code: string
  cardCount: number
  mechanics: string[]
}

export enum ColorEnum {
  RED = 'RED',
  BLUE = 'BLUE',
  WHITE = 'WHITE',
  BLACK = 'BLACK',
  GREEN = 'GREEN',
  MULTICOLOR = 'MULTICOLOR',
  COLORLESS = 'COLORLESS',
}

export enum RarityEnum {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  MYTHIC = 'MYTHIC',
}

export enum CardTypeEnum {
  CREATURE = 'CREATURE',
  INSTANT = 'INSTANT',
  SORCERY = 'SORCERY',
  LAND = 'LAND',
  ARTIFACT = 'ARTIFACT',
  ENCHANTMENT = 'ENCHANTMENT',
}

export type ICard = {
  id: number
  name: string
  setCode: string // Must be one of the existing sets
  color: ColorEnum
  rarity: RarityEnum
  type: CardTypeEnum
  power?: number
  toughness?: number
}
