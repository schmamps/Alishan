import * as tokenize from '../src/tokenize'
import { SampleDocument } from './util/document'
import * as jzn from './util/jzn'


const SAMPLES = ['cambodia', 'cameroon', 'canada']

const testNormalize = (
	strPairs: string[],
) => {
	const [input, expected] = strPairs

	test(`normalize '${input}' to '${expected}'`, () => {
		expect(tokenize.normalize(input)).toBe(expected)
	})
}

const testSentences = (
	doc: SampleDocument,
) => {
	const expected = doc.sentences.map((sent) => sent.text)
	const body = expected.join(' ')

	test(`sentences in '${doc.title}'`, () => {
		expect(tokenize.sentences(body)).
			toStrictEqual(expected)
	})
}

const testWords = (
	doc: SampleDocument,
) => {
	const sentTexts = doc.sentences.map((sent) => sent.text)
	const sentWords = doc.sentences.map((sent) => sent.words)

	sentWords.forEach((words, idx) => {
		test(`${doc.title} sent ${idx}`, () => {
			expect(tokenize.words(sentTexts[idx])).
				toStrictEqual(words)
		})
	})
}

// normalize string
[
	['!AbCdeFG   ', 'abcdefg'],
].forEach(testNormalize)

// tokenize sentences
jzn.
	locate(SAMPLES).
	map((path) => new SampleDocument(path)).
	forEach(testSentences)

// tokenize words
jzn.
	locate(SAMPLES).
	map((path) => new SampleDocument(path)).
	forEach(testWords)
