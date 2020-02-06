import {MINIMUM_RANK as KW_LIMIT} from '../src/keywords'
import * as score from '../src/score'
import * as jzn from './util/jzn'
import { SentenceScore, KeywordTuple } from 'Typing'


const compareSentence = (
	actual: SentenceScore,
	expected: jzn.TestDocumentSentenceScore
) => {
	const fix = (val: number): number => Math.round(val * score.PRECISION);

	[
		'position',
		'title',
		'length',
		'keyword',
		'total'
	].forEach((key) => {
		// @ts-ignore
		const a = actual[key]
		// @ts-ignore
		const e = expected[key]

		if (fix(a) !== fix(e)) {
			throw `actual.${key} === ${a} !== ${e}`
		}
	})

	return true
}

const testDocSentences = (
	doc: jzn.TestDocument
) => {
	const limitIdx = Math.min(KW_LIMIT, doc.keywords.length) - 1
	const threshold = doc.
		keywords.
		map((kw) => kw.score).
		sort().
		reverse()[limitIdx]
	const keywords = doc.keywords.filter((kw) => kw.score >= threshold)

	const keys: KeywordTuple = [
		keywords.map((kw) => kw.stem),
		keywords.map((kw) => kw.score),
	]

	const title = doc.title
	const sentCount = doc.sentences.length
	const memo = {keys,}

	doc.sentences.forEach((sent, sentIdx) => {
		const text = sent.stemmed.join(' ')
		const expected = doc.sentences[sentIdx].score

		test(`${title.text} (${sentCount})[${sentIdx}]`, () => {
			const actual = score.sentence(
				title.text,
				text,
				sentIdx,
				sentCount,
				{},
				memo
			)
			expect(compareSentence(actual, expected)).
				toEqual(true)
		})
	})
}

// content
// TODO: ?
// memoize
// TODO: ?
// sentence
jzn.
	locate('cambodia', 'cameroon', 'canada', 'essay_snark').
	map(jzn.load).
	forEach(testDocSentences)
