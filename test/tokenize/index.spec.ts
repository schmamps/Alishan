import { expect, test } from 'vitest'
import * as tokenize from '../../src/tokenize'
import * as sample from '../params/sample'


const normalize = {
	params: sample.params('normalize', sample.COUNTRIES),

	test: (params: sample.Params) => {
		const [tag, doc] = params

		doc.
			sentences.
			forEach((sent, sIdx) => {
				const words = tokenize.words(sent.text)
				words.forEach((word, wIdx) => {
					test(`${tag}/${sIdx}/${wIdx}`, () => {
						const actual = tokenize.normalize(word)
						const expected = sent.words[wIdx]

						expect(actual).toEqual(expected)
					})
				})
			})
	},
}

const sentences = {
	params: sample.params('sentences', sample.COUNTRIES),

	test: (params: sample.Params) => {
		const [tag, doc] = params

		test(tag, () => {
			const expected = doc.sentences.map((sent) => sent.text)
			const body = expected.join('  ')
			const actual = tokenize.sentences(body)

			expect(actual).toStrictEqual(expected)
		})
	},
}

const words = {
	params: sample.params('words', sample.COUNTRIES),

	test: (params: sample.Params) => {
		const [tag, doc] = params
		const sentTexts = doc.sentences.map((sent) => sent.text)
		const sentWords = doc.sentences.map((sent) => sent.words)

		sentTexts.forEach((text: string, idx: number) => {
			test(`${tag}/sent/${idx}`, () => {
				const actual = tokenize.words(text)
				const expected = sentWords[idx]

				expect(actual).toStrictEqual(expected)
			})
		})
	},
}

const tests = [
	normalize,
	sentences,
	words,
]

tests.forEach((item) => item.params.forEach(item.test))
