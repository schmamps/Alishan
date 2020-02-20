import * as idiom from '../../src/idiom/Idiom'

const CUSTOM: idiom.IdiomOptions = {
	name: 'custom',
	tag: 'xx-YY',
	idealSentenceLength: idiom.DEFAULTS.idealSentenceLength * 2,
	minimumKeywordRank: idiom.DEFAULTS.minimumKeywordRank * 2,
	positionScores: [0, 0, 0],
	stopWords: ['custom', 'stop', 'words'],
	stem: (word: string) => word,
}

const init = (keys: string[]): [idiom.Idiom, idiom.IdiomOptions] => {
	const params: idiom.IdiomOptions = keys.
		filter((key) => !!key).
		reduce(
		(params, key) => {
			// @ts-ignore
			params[key] = CUSTOM[key]

			return params
		},
		{}
	)

	const actual = new idiom.Idiom(params)
	const expected = Object.assign({}, idiom.DEFAULTS, params)

	return [actual, expected]
}

[''].
concat(Object.keys(CUSTOM)).
forEach((key) => {
	const testName = (key.length) ? key : '(none)'
	test(`option: ${testName}`, () => {
		const [actual, expected] = init([key])

		expect(actual.name).toEqual(expected.name)
		expect(actual.tag).toEqual(expected.tag)
		expect(actual.idealSentenceLength).
			toEqual(expected.idealSentenceLength)
		expect(actual.minimumKeywordRank).toEqual(expected.minimumKeywordRank)
		expect(actual.positionScores).toEqual(expected.positionScores)
		expect(actual.stopWords).toEqual(expected.stopWords)
		expect(actual.stem('camping')).toEqual(expected.stem!('camping'))
	})
})
