import { expect, test } from 'vitest'
import { Scorer } from '../../src/sentence/Scorer'
import * as sample from '../params/sample'


const constructor = {
	params: sample.params('constructor', sample.LONG),

	test: (params: sample.Params) => {
		const [tag, doc] = params

		doc.sentences.forEach((sent, idx) => test(`${tag}/${idx}`, () => {
			const actual = new Scorer(sent.text)

			expect(actual.text).toEqual(sent.text)
			expect(actual.sentStems).toEqual(sent.stemmed)
			expect(actual.subScores.dbs).toBe(0)
			expect(actual.subScores.sbs).toBe(0)
			// expect(actual.subScores.length).toBe... tricky
			expect(actual.subScores.position).toBe(0)
			expect(actual.subScores.title).toBe(0)
		}))
	},
}

const keywords = {
	params: sample.params('keywords', sample.LONG),

	test: (params: sample.Params) => {
		const [tag, doc] = params

		doc.sentences.forEach((sent, idx) => test(`${tag}/${idx}`, () => {
			const inst = new Scorer(sent.text)
			const [kwStrs, kwScores] = doc.getKeywordTuple()
			inst.setKeywords(kwStrs, kwScores)

			const actual = inst.subScores
			const expected = sent.score

			expect(actual.dbs).toBeCloseTo(expected.dbs)
			expect(actual.sbs).toBeCloseTo(expected.sbs)
		}))
	},
}

const position = {
	params: sample.params('position', sample.LONG),

	test: (params: sample.Params) => {
		const [tag, doc] = params

		doc.sentences.forEach((sent, idx) => test(`${tag}/${idx}`, () => {
			const inst = new Scorer(sent.text)
			inst.setPosition(sent.index, sent.of)

			const actual = inst.subScores
			const expected = sent.score

			expect(actual.position).toBeCloseTo(expected.position)
		}))
	},
}

const title = {
	params: sample.params('title', sample.LONG),

	test: (params: sample.Params) => {
		const [tag, doc] = params

		doc.sentences.forEach((sent, idx) => test(`${tag}/${idx}`, () => {
			const actual = new Scorer(sent.text).
				setTitle(doc.title.text).
				subScores
			const expected = sent.score

			expect(actual.title).toBeCloseTo(expected.title)
		}))
	},
}

const getSentence = {
	params: sample.params('get sentence', sample.LONG),
	test: (params: sample.Params) => {
		const [tag, doc] = params

		doc.sentences.forEach((sent, idx) => test(`${tag}/${idx}`, () => {
			const inst = new Scorer(sent.text)
			const [kwStrs, kwScores] = doc.getKeywordTuple()
			inst.setKeywords(kwStrs, kwScores)
			inst.setPosition(sent.index, sent.of)
			inst.setTitle(doc.title.text)

			const actual = inst.getSentence()
			const expected = sent

			expect(actual.text).toEqual(sent.text)
			expect(actual.score.dbs).toBeCloseTo(expected.score.dbs)
			expect(actual.score.sbs).toBeCloseTo(expected.score.sbs)
			expect(actual.score.position).toBeCloseTo(expected.score.position)
			expect(actual.score.title).toBeCloseTo(expected.score.title)
			expect(actual.score.keyword).toBeCloseTo(expected.score.keyword)
			expect(actual.score.total).toBeCloseTo(expected.score.total)
		}))
	},
}

const tests = [
	constructor,
	keywords,
	position,
	title,
	getSentence
]

tests.forEach((item) => item.params.forEach(item.test))
