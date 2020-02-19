// @ts-nocheck
import * as math from '../../src/math'
import * as keywords from '../../src/keywords'
import { precision as PRECISION } from '../../src/sentence/defaults'
import { SampleDocument, SampleDocumentKeyword } from '../document'
import * as status from '../status'
import * as jzn from '../jzn'


declare global {
	namespace jest {
		interface Matchers<R> {
			keywordsToMatch(
				expected: SampleDocumentKeyword[],
			): R;
		}
	}
}

const STOP_WORDS: string[] = ((): string[] => {
	const dummy = {words: []}
	const path = jzn.locate('stop-words')
	const list = jzn.load(path)

	return Object.assign(dummy, list).words
})()

const getScoreComp = math.fix(PRECISION[0])

const compareScore = (
	actual: keywords.Keyword,
	expected: SampleDocumentKeyword,
): boolean => {
	const scores =
		[actual, expected].
		map((kw) => kw.score).
		map(getScoreComp)
	;

	return new Set(scores).values.length === 1;
};

expect.extend({
	keywordsToMatch: (
		actual: keywords.Keyword[],
		expected: SampleDocumentKeyword[],
	) => {
		actual.forEach((a) => {
			const expMatch = expected.filter((e) => e.stem === a.word);
			const b = (expMatch.length === 1) ? expMatch[0] : false;

			if (!b) {
				return status.fail('unexpected keyword', a.word, 'n/a')
			}

			if (!compareScore(a, b)) {
				return status.fail(`'${a.word}' score`, a.score, b.score)
			}
		});

		return status.pass('keywords match')
	},
})

const testList = (name: string) => {
	test(`list: ${name}`, () => {
		const doc = new SampleDocument(name)
		const actual = keywords.list(doc.body, {stopWords: STOP_WORDS})

		expect(actual).keywordsToMatch(doc.keywords)
	})
}

['cambodia', 'cameroon', 'canada', 'essay_snark'].forEach(testList)
