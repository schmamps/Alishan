import * as string from '../../src/string'

type StringTestParams = [string, string, number?]

const ATOZ = 'abcdefghijklmnopqrstuvwxyz'

const testSnip = (params: StringTestParams) => {
	const expected = params.shift()

	test(`'${expected}' === snip(${params})`, () => {
		// @ts-ignore
		const actual = string.snip(...params)

		expect(actual).toEqual(expected)
	})
}

const PARAMS: StringTestParams[] = [
	['abcdefghij...', ATOZ,],
	['abc...', ATOZ, 3],
	[ATOZ, ATOZ, 26],
]

PARAMS.forEach(testSnip)
