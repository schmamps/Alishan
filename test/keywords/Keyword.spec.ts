import { Keyword, } from '../../src/keywords/'
import { SampleDocument, } from '../document'


const testConstruct = (name: string) => {
	const doc = new SampleDocument(name)
	const count = doc.keywords.reduce((count, kw) => count + kw.count, 0)

	doc.keywords.forEach((kw) => {
		test(`Keyword(${kw.stem}, ${kw.count}, ${count})`, () => {
			const {word, score} = new Keyword(kw.stem, kw.count, count)

			expect(word).toEqual(kw.stem)
			expect(score).toBeCloseTo(kw.score)
		})
	})
}

['cambodia', 'cameroon', 'canada', 'essay_snark'].forEach(testConstruct)
