import { describe, expect, it, vi } from 'vitest'
import setsRouter from './sets.index.js'
import createApp from '@/utils/create_app.js'
import config from '@/config.js'

describe('Sets list', () => {
  it('successfully returns an array of sets', async () => {
    const testRouter = createApp(config).route('/', setsRouter)

    const response = await testRouter.request('/api/v1/sets')
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
    const testRouter = createApp(config).route('/', setsRouter)

    const response = await testRouter.request('/api/v1/sets/abc')
    const result = await response.json()

    expect(response.status).toBe(404)
    expect(result).toEqual({ message: 'Set not found!' })
  })
  it('successfully returns a set', async () => {
    const testRouter = createApp(config).route('/', setsRouter)

    const response = await testRouter.request('/api/v1/sets/ecl')
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
    const testRouter = createApp(config).route('/', setsRouter)
    const setData = {
      name: 'Test set',
      code: 'TS',
      cardCount: 3,
      mechanics: ['Awesomeness', 'Testing'],
    }

    const response = await testRouter.request('/api/v1/sets', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(setData),
    })
    const result = await response.json()

    expect(response.status).toBe(500)
  })
})
