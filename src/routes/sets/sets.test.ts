import { beforeAll, describe, expect, it } from 'vitest'
import setsRouter from './sets.index.js'
import createApp from '@/utils/create_app.js'
import config from '@/config.js'

describe('Sets list', () => {
  it('successfully returns an array of sets', async () => {
    const testRouter = createApp(config).route('/', setsRouter)

    const sets = await testRouter.request('/api/v1/sets')
    const result = await sets.json()

    expect(result[0]).toEqual({
      id: 1,
      name: 'Lorwyn Eclipsed',
      code: 'ECL',
      cardCount: 274,
      mechanics: ['Blight', 'Vivid', 'Behold', 'Changeling', 'Convoke', 'Evoke'],
    })
  })
})

describe('Set by code', () => {
  it('returns 404 when set not found', async () => {
    const testRouter = createApp(config).route('/', setsRouter)

    const set = await testRouter.request('/api/v1/sets/abc')
    const result = await set.json()

    expect(result).toEqual({ message: 'Set not found!' })
  })
  it('successfully returns a set', async () => {
    const testRouter = createApp(config).route('/', setsRouter)

    const set = await testRouter.request('/api/v1/sets/ecl')
    const result = await set.json()

    expect(result).toEqual({
      id: 1,
      name: 'Lorwyn Eclipsed',
      code: 'ECL',
      cardCount: 274,
      mechanics: ['Blight', 'Vivid', 'Behold', 'Changeling', 'Convoke', 'Evoke'],
    })
  })
})
