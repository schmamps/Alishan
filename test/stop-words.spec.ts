import * as stopWords from '../src/stop-words'

const ATOY = 'abcdefghijklmnopqrstuvwxy'.split('');

const getRandomStopWord = (): string => {
	const idx = Math.round(stopWords.defaults.length / 3)

	return stopWords.defaults[idx]
}

const testValid = () => {
	const strs = stopWords.
		defaults.
		filter((word: string) => typeof(word) === 'string')

	test('valid stop words', () => {
		expect(strs.length).
			toStrictEqual(stopWords.defaults.length)
	})
}

const testFilter = (
	init: string[] | null,
	arg: string,
	expected: boolean,
	desc: string,
) => {
	const filter = stopWords.createFilter(init!)
	const testName = `filter ${arg} in ${init}(${desc}) = ${expected}`

	test(testName, () => {
		expect(filter(arg)).toEqual(expected)
	})
}

// semi prevents ts(7053)
[1].forEach(testValid);

[
	[null, getRandomStopWord(), false, 'defaults'],
	[null, 'us', false, 'defaults'],
	[null, 'zzyzx', true, 'defaults'],
	[ATOY, 'a', false, 'custom'],
	[ATOY, 'z', true, 'custom'],
].forEach((params) => {
	const [filterInit, filterArg, expected, desc] = params
	testFilter(
		Array.isArray(filterInit) ? filterInit.map(String) : null,
		String(filterArg),
		!!expected,
		String(desc)
	)
})

