import { filter as kwFilter } from '../../src/keywords/'


type TestFilterParam = [boolean, string[], string]

const STOPS = 'foo bar baz'.split(/\s+/)
const PARAMS: TestFilterParam[] = [
	[false, STOPS, 'foo', ],
	[false, STOPS, 'bar', ],
	[false, STOPS, 'baz', ],
	[true,  STOPS, 'quux',],
]

PARAMS.forEach((params: TestFilterParam) => {
	const [expected, stopWords, word] = params

	test(`'${word}' not in ${STOPS}`, () => {
		const actual = kwFilter.create(stopWords)(word)

		expect(actual).toBe(expected)
	})
});
