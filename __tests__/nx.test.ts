import {expect, test} from '@jest/globals'
import {getNxAffected, parseAffected} from '../src/nx'

test('getNxAffected', () => {
  const actual = getNxAffected({workspace: '.'})
  expect(actual).toEqual([])
})

test('parseAffected null', () => {
  const actual = parseAffected({result: null})
  expect(actual).toEqual([])
})

test('parseAffected single', () => {
  const actual = parseAffected({result: 'project1'})
  expect(actual).toEqual(['project1'])
})

test('parseAffected multiple', () => {
  const actual = parseAffected({result: 'project1 project2 project3'})
  expect(actual).toEqual(['project1', 'project2', 'project3'])
})

test('parseAffected multiple with ignore not found', () => {
  const actual = parseAffected({
    result: 'project1 project2 project3',
    affectedToIgnore: 'project4'
  })
  expect(actual).toEqual(['project1', 'project2', 'project3'])
})

test('parseAffected multiple with ignore found', () => {
  const actual = parseAffected({
    result: 'project1 project2 project3',
    affectedToIgnore: 'project3,project2'
  })
  expect(actual).toEqual(['project1'])
})

test('parseAffected multiple with ignore found all', () => {
  const actual = parseAffected({
    result: 'project1 project2 project3',
    affectedToIgnore: 'project3,project1,project2'
  })
  expect(actual).toEqual([])
})
