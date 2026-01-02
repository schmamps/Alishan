import { expect, test } from 'vitest'
import { Sentence } from '../../src/sentence/Sentence'
import * as sample from '../params/sample'


const constructor = {
	params: sample.params('constructor', 'cambodia'),
	test: (params: sample.Params) => {
		const [tag, doc] = params

		doc.sentences.forEach((sent, idx) => test(`${tag}/${idx}`, () => {
			const { dbs, sbs, length, position, title } = sent.score
			const actual = new Sentence(
				sent.text,
				sent.index,
				{ dbs, sbs, length, position, title }
			)
			const expected = sent

			expect(actual.text).toEqual(expected.text)
			expect(actual.index).toEqual(expected.index)
			expect(actual.score.dbs).toBeCloseTo(expected.score.dbs)
			expect(actual.score.sbs).toBeCloseTo(expected.score.sbs)
			expect(actual.score.keyword).toBeCloseTo(expected.score.keyword)
			expect(actual.score.length).toBeCloseTo(expected.score.length)
			expect(actual.score.position).toBeCloseTo(expected.score.position)
			expect(actual.score.title).toBeCloseTo(expected.score.title)
			expect(actual.score.total).toBeCloseTo(expected.score.total)
		}))
	},
}
const tests = [
	constructor,
]

tests.forEach((item) => item.params.forEach(item.test))
