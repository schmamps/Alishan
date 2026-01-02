import { expect, test } from 'vitest'
import filter from '../../src/filter'

const LONG = [1, 2, 3, 4, 5]
const HEAD = LONG.slice(0, 3)
const TAIL = LONG.slice(3)

test('all:number', () => {
	const actual = filter(HEAD).all(LONG)
	const expected = TAIL

	expect(actual).toEqual(expected)
})

test('all:string', () => {
	const actual = filter(HEAD.map(String)).all(LONG.map(String))
	const expected = TAIL.map(String)

	expect(actual).toEqual(expected)
})

test('one', () => {
	const actual = LONG.filter(filter(HEAD).one)
	const expected = TAIL

	expect(actual).toEqual(expected)
})
