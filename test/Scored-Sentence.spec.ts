import { ScoredSentence } from '../src/Scored-Sentence'
import { SampleDocument, SampleSentence } from './util/document'
import * as jzn from './util/jzn'


/**
 *
 * @param {Object} actual
 * @param {Object} expected
 * @returns {boolean}
 */
const compare = (
	actual: ScoredSentence,
	expected: SampleSentence,
): boolean => {
	const text = actual._text === expected.text
	const of = actual._of === expected.of
	const score = actual.score.total === expected.score.total

	return text && of && score
}

/**
 * Create sentence testing function
 * @param {boolean} valid
 * @returns {function}
 */
const testSentence = (
	expected: SampleSentence,
	passes: boolean,
	docTitle: string,
) => {
	const construct = () => new ScoredSentence(
		expected.text,
		expected.index,
		expected.of!,
		expected.score
	)

	test(`(${docTitle}).sentence[${expected.index}]`, () => {
		try {
			const actual = construct()

			expect(compare(actual, expected)).toEqual(passes)
		}
		catch (e) {
			expect(e.toString()).toMatch(/invalid\sindex/i)
		}
	})
};

const testSample = (doc: SampleDocument) => {
	const title = doc.title.text
	const valid = doc.sentences

	valid.
		map((sent) => Object.assign({}, sent, {of: valid.length})).
		forEach((sent) => testSentence(sent, true, title));

	[
		Object.assign({}, valid[0], {index: Infinity}),
		Object.assign({}, valid[1], {of: 0}),
		Object.assign({}, valid[2], {text: `  ${valid[2].text}\n`})
	].forEach((sent) => testSentence(sent, false, title))
}

jzn.
	locate('cambodia', 'cameroon', 'canada').
	map((path) => new SampleDocument(path)).
	forEach(testSample)
