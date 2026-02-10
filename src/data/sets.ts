import { SetCodeEnum, type ISet } from '../interfaces.js'

export const sets: ISet[] = [
  {
    id: 0,
    name: 'Lorwyn Eclipsed',
    code: SetCodeEnum.ECL,
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
    code: SetCodeEnum.FDN,
    cardCount: 271,
    mechanics: [
      'Flash',
      'Flashback',
      'Kicker',
      'Landfall',
      'Prowess',
      'Raid',
      'Threshold',
    ],
  },
] as const
