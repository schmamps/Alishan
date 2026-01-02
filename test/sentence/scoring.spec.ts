import { expect, test } from 'vitest'
import { Idiom } from '../../src/idiom'
import * as scoring from '../../src/sentence/scoring'
import * as sample from '../params/sample'
import stopWords from '../params/stop-words'


const DEFAULT_IDIOM = new Idiom()

const dbs = {
	params: sample.params('dbs', sample.LONG),
	test: (params: sample.Params) => {
		const [tag, doc] = params
		const [kwStrs, kwScores] = doc.getKeywordTuple()

		doc.sentences.forEach((sent, idx) => {
			test(`${tag}/${idx}`, () => {
				const actual = scoring.dbs(sent.stemmed, kwStrs, kwScores)
				const expected = sent.score.dbs

				expect(actual).toBeCloseTo(expected)
			})
		})
	},
}

const sbs = {
	params: sample.params('sbs', sample.LONG),
	test: (params: sample.Params) => {
		const [tag, doc] = params
		const [kwStrs, kwScores] = doc.getKeywordTuple()

		doc.sentences.forEach((sent, idx) => {
			test(`${tag}/${idx}`, () => {
				const actual = scoring.sbs(sent.stemmed, kwStrs, kwScores)
				const expected = sent.score.sbs

				expect(actual).toBeCloseTo(expected)
			})
		})
	},
}

const keywords = {
	params: sample.params('keywords', sample.LONG),
	test: (params: sample.Params) => {
		const [tag, doc] = params

		doc.sentences.forEach((sent, idx) => {
			test(`${tag}/${idx}`, () => {
				const actual = scoring.keywords(sent.score.dbs, sent.score.sbs)
				const expected = sent.score.keyword

				expect(actual).toBeCloseTo(expected)
			})
		})
	},
}

const length = {
	params: sample.params('length', sample.LONG),
	test: (params: sample.Params) => {
		const [tag, doc] = params
		const { idealSentenceLength: idealLength } = DEFAULT_IDIOM

		doc.sentences.forEach((sent, idx) => {
			test(`${tag}/${idx}`, () => {
				const actual = scoring.length(sent.words.length, idealLength)
				const expected = sent.score.length

				expect(actual).toBeCloseTo(expected)
			})
		})
	},
}

const position = {
	params: sample.params('position', sample.LONG),
	test: (params: sample.Params) => {
		const [tag, doc] = params
		const sentCount = doc.sentences.length
		const { positionScores: posScores } = DEFAULT_IDIOM

		doc.sentences.forEach((sent, idx) => {
			test(`${tag}/${idx}`, () => {
				const actual = scoring.position(idx, sentCount, posScores)
				const expected = sent.score.position

				expect(actual).toBeCloseTo(expected)
			})
		})
	},
}

const title = {
	params: sample.params('title', sample.LONG),
	test: (params: sample.Params) => {
		const [tag, doc] = params

		doc.sentences.forEach((sent, idx) => {
			test(`${tag}/${idx}`, () => {
				const actual = scoring.title(
					doc.title.keywords,
					sent.stemmed,
					stopWords
				)
				const expected = sent.score.title

				expect(actual).toBeCloseTo(expected)
			})
		})
	},
}

const total = {
	params: sample.params('total', sample.LONG),
	test: (params: sample.Params) => {
		const [tag, doc] = params
		doc.sentences.forEach((sent, idx) => {
			const actual = scoring.total(
				sent.score.keyword,
				sent.score.length,
				sent.score.position,
				sent.score.title
			)
			const expected = sent.score.total

			test(`${tag}/${idx}`, () => {
				expect(actual).toBeCloseTo(expected)
			})
		})
	},
}

const tests = [
	dbs,
	sbs,
	keywords,
	length,
	position,
	title,
	total,
]

tests.forEach((item) => item.params.forEach(item.test))
