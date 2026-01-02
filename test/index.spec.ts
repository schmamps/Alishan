import { expect, test } from 'vitest'
import * as alishan from '../src/'
import * as sample from './params/sample'
import stopWords from './params/stop-words'


const score = {
	params: sample.params('score', sample.LONG),

	test: (params: sample.Params) => {
		const [tag, doc] = params
		test(tag, () => {
			const scored = alishan.score(
				doc.body,
				doc.title.text,
				{ stopWords }
			)

			scored.forEach((actual, idx) => {
				const expected = doc.sentences[idx]
				expect(actual.text).toEqual(expected.text)
				expect(actual.index).toEqual(expected.index)
			})

			scored.forEach((sent, idx) => {
				const actual = sent.score
				const expected = doc.sentences[idx].score

				expect(actual.dbs).toBeCloseTo(expected.dbs)
				expect(actual.sbs).toBeCloseTo(expected.sbs)
				expect(actual.length).toBeCloseTo(expected.length)
				expect(actual.position).toBeCloseTo(expected.position)
				expect(actual.title).toBeCloseTo(expected.title)
				expect(actual.keyword).toBeCloseTo(expected.keyword)
				expect(actual.total).toBeCloseTo(expected.total)
			})
		})
	},
}

const summarize = {
	params: sample.params('summarize', sample.LONG),

	test: (params: sample.Params) => {
		const [tag, doc] = params
		const counts = [1, 5]

		counts.forEach((rc) => test(`${tag}/${rc}`, () => {
			const actual = alishan.summarize(
				doc.body,
				doc.title.text,
				{ returnCount: rc, stopWords }
			)
			const expected = doc.
				sentences.
				filter((sent) => sent.rank < rc).
				map((sent) => sent.text)

			expect(actual).toEqual(expected)
		}))
	},
}

const tests = [
	score,
	summarize,
]

tests.forEach((item) => item.params.forEach(item.test))
