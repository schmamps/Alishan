import { Content } from '../../src/content/Content'
import { Sentence } from '../../src/sentence/Sentence'
import { Idiom } from '../../src/idiom'
import * as sample from '../params/sample'
import stopWords from '../params/stop-words'


const DEFAULT_IDIOM = new Idiom({stopWords})

const compare = {
	constructor: (
		actual: Content,
		expected: sample.SampleDocument,
		idiom?: Idiom,
	) => {
		expect(actual.title).toEqual(expected.title.text)

		actual.sentences.forEach((sent, idx) => {
			expect(sent).toEqual(expected.sentences[idx].text)
		})

		if (idiom) {
			[
				'name',
				'tag',
				'idealSentenceLength',
				'minimumKeywordRank',
				'stopWords',
				'positionScores'
			].forEach((prop) => {
				// @ts-ignore
				expect(actual.idiom[prop]).toEqual(idiom[prop])
			})
		}
	},
	score: (
		actual: Sentence,
		expected: sample.SampleSentence,
	) => {
		expect(actual.text).toEqual(expected.text)
		expect(actual.index).toEqual(expected.index)
		expect(actual.score.dbs).toBeCloseTo(expected.score.dbs)
		expect(actual.score.sbs).toBeCloseTo(expected.score.sbs)
		expect(actual.score.length).toBeCloseTo(expected.score.length)
		expect(actual.score.position).toBeCloseTo(expected.score.position)
		expect(actual.score.title).toBeCloseTo(expected.score.title)
		expect(actual.score.keyword).toBeCloseTo(expected.score.keyword)
		expect(actual.score.total).toBeCloseTo(expected.score.total)
	},
}

const constructor = {
	params: sample.params('constructor', sample.LONG),
	test: (params: sample.Params) => {
		const [tag, doc] = params
		const initParams: {[key: string]: Idiom | boolean} = {
			base: false,
			default: new Idiom(),
			stops: new Idiom({stopWords: []}),
			ideal: new Idiom({idealSentenceLength: 9}),
			posScores: new Idiom({positionScores: []}),
		}

		Object.keys(initParams).forEach((key) => {
			test(`${tag}/${key}`, () => {
				let actual: Content

				if (initParams[key]) {
					actual = new Content(
						doc.body,
						doc.title.text,
						// @ts-ignore
						initParams[key]
					)

					// @ts-ignore
					compare.constructor(actual, doc, initParams[key])
				}
				else {
					actual = new Content(doc.body, doc.title.text)

					compare.constructor(actual, doc)
				}
			})
		})
	}
}

const score = {
	params: sample.params('score', sample.LONG),

	test: (params: sample.Params) => {
		const [tag, doc] = params

		new Content(doc.body, doc.title.text, DEFAULT_IDIOM).
			score().
			forEach((actual, idx) => test(`${tag}/${idx}`, () => {
				const expected = doc.sentences[idx]

				compare.score(actual, expected)
			}))
	},
}

const summarize = {
	params: sample.params('summarize', sample.LONG),

	test: (params: sample.Params) => {
		const [tag, doc] = params
		const content = new Content(doc.body, doc.title.text, DEFAULT_IDIOM)
		const sents = doc.sentences.sort((a, b) => a.rank - b.rank)
		const counts = [1/2, 1, 5]

		counts.forEach((rc) => {

			test(`${tag}/${rc}`, () => {
				const actual = content.summarize(rc)
				const expected = sents.
					slice(0, (rc < 1) ? Math.round(sents.length * rc) : rc).
					sort((a, b) => a.index - b.index).
					map((sent) => sent.text)

				expect(actual).toEqual(expected)
			})
		})
	},
}

const tests = [
	constructor,
	score,
	summarize,
]

tests.forEach((item) => item.params.forEach(item.test))
