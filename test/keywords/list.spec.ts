import { Idiom } from '../../src/idiom'
import * as keywords from '../../src/keywords'
import { instantiateDoc, SampleDocument, SampleDocumentKeyword } from '../document'
import * as jzn from '../jzn'


const STOP_WORDS: string[] = ((): string[] => {
	// for consistency with OolongT (somehow)
	const dummy = {words: []}
	const path = jzn.locate('stop-words')
	const list = jzn.load(path)

	return Object.assign(dummy, list).words
})()

const listUniq = (
	actual: keywords.Keyword[],
	expected: SampleDocumentKeyword[]
): Set<string> => {
	const all = expected.
		map((kw) => kw.stem).
		concat(actual.map((kw) => kw.word))

	return new Set(all)
}

const testLength = (
	actual: keywords.Keyword[],
	doc: SampleDocument,
) => {
	const expected = doc.keywords
	const unique = listUniq(actual, expected)

	test(`${doc.name}: unique keywords`, () => {
		expect(actual.length).toEqual(expected.length)
		expect(unique.size).toEqual(expected.length)
	})
}

const createWordTest = (
	doc: SampleDocument
) => (
	actual: keywords.Keyword
) => {
	test(`${doc.name}: '${actual.word}'`, () => {
		const [expected = null] = doc.keywords.
			filter((kw) => kw.stem === actual.word)

		expect(expected).toBeTruthy()
		expect(actual.score).toBeCloseTo(expected!.score)
	})
}


const testList = (doc: SampleDocument) => {
	const { body } = doc
	const idiom = new Idiom({stopWords: STOP_WORDS})
	const actual = keywords.list(body, idiom)

	testLength(actual, doc)

	const testWord = createWordTest(doc)
	actual.forEach(testWord)
}

['cambodia', 'cameroon', 'canada', 'essay_snark',].
map(instantiateDoc).
forEach(testList)
