export type ISetType = 'ECL' | 'FDN'

type ISet = {
  id: number
  name: string
  code: ISetType
  cardCount: number
  mechanics: string[]
}

export const sets: ISet[] = [
  {
    id: 0,
    name: 'Lorwyn Eclipsed',
    code: 'ECL',
    cardCount: 274,
    mechanics: [
      'Blight',
      'Vivid',
      'Affinity',
      'Basic',
      'Landcycling',
      'Behold',
      'Changeling',
      'Conspire',
      'Convoke',
      'Evoke',
      'Flashback',
      'Persist',
      'Proliferate',
      'Transform',
      'Wither',
    ],
  },
  {
    id: 1,
    name: 'Foundations',
    code: 'FDN',
    cardCount: 271,
    mechanics: ['Flash', 'Flashback', 'Kicker', 'Landfall', 'Prowess', 'Raid', 'Threshold'],
  },
]
