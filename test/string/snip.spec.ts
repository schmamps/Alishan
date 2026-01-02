import { expect, test } from 'vitest'
import * as string from '../../src/string/snip'


type StringTestParams = [string, string, number?]
interface TestSnip {
	params: StringTestParams[],
	test: (x: StringTestParams) => void
}

const ATOZ = 'abcdefghijklmnopqrstuvwxyz'

const snip: TestSnip = {
	params: [
		['abcdefghij...', ATOZ,],
		['abc...', ATOZ, 3],
		[ATOZ, ATOZ, 26],
	],
	test: (params: StringTestParams) => {
		const expected = params.shift()

		test(`'${expected}' === snip(${params})`, () => {
			// @ts-ignore
			const actual = string.snip(...params)

			expect(actual).toEqual(expected)
		})
	},
}
const tests = [
	snip
]

tests.forEach((item) => item.params.forEach(item.test))
