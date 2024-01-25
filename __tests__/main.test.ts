import {expect, test} from '@jest/globals'
import {getNxAffected} from '../src/nx'

test('fake test for now', () => {
  expect(true).toBeTruthy()
})

test('nx getAffected', () => {
  const actual = getNxAffected({workspace: '.'})
  expect(actual).toEqual([])
})
