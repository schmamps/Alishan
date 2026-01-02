import { test } from 'vitest'
import { Keyword, } from '../../src/keywords/'
import * as sample from '../params/sample'


const constructor = {
	params: sample.params('constructor', sample.COUNTRIES, sample.ESSAY),

	test: (params: sample.Params) => {
		const [tag, doc] = params
		const count = doc.keywords.reduce((count, kw) => count + kw.count, 0)

		doc.keywords.forEach((expected) => {
			test(`${tag}/${expected.stem}`, () => {
				const actual = new Keyword(
					expected.stem,
					expected.count,
					count
				)

				expected.compare(actual)
			})
		})
	},
}

const tests = [
	constructor
]

tests.forEach((item) => item.params.forEach(item.test))
