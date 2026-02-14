import prisma from './prisma.js'
;(async () => {
  console.log('Initialized seeding...')
  console.log('Seeding sets...')
  await prisma.set.createMany({
    data: [
      {
        name: 'Lorwyn Eclipsed',
        code: 'ECL',
        cardCount: 274,
        mechanics: 'Blight|Vivid|Behold|Changeling|Convoke|Evoke',
      },
      {
        name: 'Foundations',
        code: 'FDN',
        cardCount: 271,
        mechanics: 'Flash|Flashback|Kicker|Landfall|Prowess|Raid|Threshold',
      },
      {
        name: 'Edge of Eternities',
        code: 'EOE',
        cardCount: 276,
        mechanics: 'Spacecraft|Planet|Warp|Void|Lander Tokens',
      },
    ],
  })
  console.log('Seeding sets finished!')
  console.log('Seeding successfully finished!')
})()
