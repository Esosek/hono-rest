import { describe, expect, it } from 'vitest'
import setsRouter from './sets.index.js'
import createApp from '@/utils/create_app.js'
import { testClient } from 'hono/testing'

describe('Sets list', () => {
  it('successfully returns an array of sets', async () => {
    const testRouter = createApp().route('/', setsRouter)

    const response = await testRouter.request('/')
    const result = await response.json()

    expect(response.status).toBe(200)
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
    const testRouter = createApp().route('/', setsRouter)

    const response = await testRouter.request('/abc')
    const result = await response.json()

    expect(response.status).toBe(404)
    expect(result).toEqual({ message: 'Set not found!' })
  })
  it('successfully returns a set', async () => {
    const testRouter = createApp().route('/', setsRouter)
    const client = testClient(testRouter)

    const response = await client[':code'].$get({ param: { code: 'ecl' } })
    const result = await response.json()

    expect(response.status).toBe(200)
    expect(result).toEqual({
      id: 1,
      name: 'Lorwyn Eclipsed',
      code: 'ECL',
      cardCount: 274,
      mechanics: ['Blight', 'Vivid', 'Behold', 'Changeling', 'Convoke', 'Evoke'],
    })
  })
})

describe('Create set', () => {
  it('fails to create set with existing code', async () => {
    const testRouter = createApp().route('/', setsRouter)
    const setData = {
      name: 'Test set',
      code: 'TS',
      cardCount: 3,
      mechanics: ['Awesomeness', 'Testing'],
    }

    const response = await testRouter.request('/', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(setData),
    })
    const result = await response.json()

    expect(response.status).toBe(500)
  })
})
