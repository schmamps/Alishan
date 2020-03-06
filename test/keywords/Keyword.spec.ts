import * as sample from '../params/sample'
import { Keyword, } from '../../src/keywords/'



const testConstructor = (item: sample.Params) => {
	const [tag, doc] = item
	const count = doc.keywords.reduce((count, kw) => count + kw.count, 0)

	doc.keywords.forEach((expected) => {
		test(`${tag}/${expected.stem}`, () => {
			const actual = new Keyword(expected.stem, expected.count, count)

			expected.compare(actual)
		})
	})
}

sample.
	params('constructor', sample.COUNTRIES, sample.ESSAY).
	forEach(testConstructor)
