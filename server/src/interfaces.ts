export type ISet = {
  id: number
  name: string
  code: string
  cardCount: number
  mechanics: string[]
}

export enum ColorEnum {
  RED = 'red',
  BLUE = 'blue',
  WHITE = 'white',
  BLACK = 'black',
  GREEN = 'green',
  MULTICOLOR = 'multicolor',
  COLORLESS = 'colorless',
}

export enum RarityEnum {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  MYTHIC = 'mythic',
}

export enum CardTypeEnum {
  CREATURE = 'creature',
  INSTANT = 'instant',
  SORCERY = 'sorcery',
  LAND = 'land',
  ARTIFACT = 'artifact',
  ENCHANTMENT = 'enchantment',
}

export type ICard = {
  id: number
  name: string
  setCode: string // TODO: This must be one of the existing sets
  color: ColorEnum
  rarity: RarityEnum
  type: CardTypeEnum
  power?: number
  toughness?: number
}
