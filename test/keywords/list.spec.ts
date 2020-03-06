import { Idiom } from '../../src/idiom'
import * as keywords from '../../src/keywords'
import * as sample from '../params/sample'
import stopWords from '../params/stop-words'


const listUniq = (
	actual: keywords.Keyword[],
	expected: sample.SampleKeyword[],
): Set<string> => {
	const all = expected.
		map((kw) => kw.stem).
		concat(actual.map((kw) => kw.word))

	return new Set(all)
}

const testLength = (
	actual: keywords.Keyword[],
	doc: sample.SampleDocument,
	tag: string,
) => {
	const expected = doc.keywords
	const unique = listUniq(actual, expected)

	test(`${tag}/unique-keywords`, () => {
		expect(actual.length).toEqual(expected.length)
		expect(unique.size).toEqual(expected.length)
	})
}

const createWordTest = (
	doc: sample.SampleDocument,
	tag: string,
) => (
	actual: keywords.Keyword
) => {
	test(`${tag}/${actual.word}'`, () => {
		const [expected = null] = doc.keywords.
			filter((kw) => kw.stem === actual.word)

		expect(expected).toBeTruthy()
		expect(actual.score).toBeCloseTo(expected!.score)
	})
}

const list = {
	params: sample.params('list keywords', sample.COUNTRIES, sample.ESSAY),

	test: (params: sample.Params) => {
		const [tag, doc] = params
		const { body } = doc
		const idiom = new Idiom({stopWords})
		const actual = keywords.list(body, idiom)

		testLength(actual, doc, tag)

		const testWord = createWordTest(doc, tag)
		actual.forEach(testWord)
	}
}

const tests = [
	list
]

tests.forEach((item) => item.params.forEach(item.test))
