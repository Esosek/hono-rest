import { CardColor, CardRarity, CardType } from '@/generated/prisma/enums.js'
import prisma from './prisma.js'
;(async () => {
  console.log('Initialized seeding...')
  console.log('Seeding sets...')
  await prisma.set.createMany({
    data: [
      {
        name: 'Lorwyn Eclipsed',
        code: 'ECL',
        cardCount: 3,
        mechanics: 'Blight|Vivid|Behold|Changeling|Convoke|Evoke',
      },
      {
        name: 'Foundations',
        code: 'FDN',
        cardCount: 3,
        mechanics: 'Flash|Flashback|Kicker|Landfall|Prowess|Raid|Threshold',
      },
      {
        name: 'Edge of Eternities',
        code: 'EOE',
        cardCount: 0,
        mechanics: 'Spacecraft|Planet|Warp|Void|Lander Tokens',
      },
    ],
  })
  console.log('Seeding sets finished!')

  console.log('Seeding cards...')
  await prisma.card.createMany({
    data: [
      {
        name: 'Brambleback Brute',
        setCode: 'ECL',
        color: CardColor.RED,
        rarity: CardRarity.COMMON,
        type: CardType.CREATURE,
        power: 4,
        toughness: 5,
      },
      {
        name: 'Pitiless Fists',
        setCode: 'ECL',
        color: CardColor.GREEN,
        rarity: CardRarity.UNCOMMON,
        type: CardType.ENCHANTMENT,
      },
      {
        name: 'Run Away Together',
        setCode: 'ECL',
        color: CardColor.BLUE,
        rarity: CardRarity.COMMON,
        type: CardType.INSTANT,
      },
      {
        name: 'Sire of Seven Deaths',
        setCode: 'FDN',
        color: CardColor.COLORLESS,
        rarity: CardRarity.MYTHIC,
        type: CardType.CREATURE,
        power: 7,
        toughness: 7,
      },
      {
        name: 'Grappling Kraken',
        setCode: 'FDN',
        color: CardColor.BLUE,
        rarity: CardRarity.UNCOMMON,
        type: CardType.CREATURE,
        power: 5,
        toughness: 6,
      },
      {
        name: 'Midnight Snack',
        setCode: 'FDN',
        color: CardColor.BLACK,
        rarity: CardRarity.UNCOMMON,
        type: CardType.ENCHANTMENT,
      },
    ],
  })
  console.log('Seeding cards finished!')

  console.log('Seeding successfully finished!')
})()
