import { Keyword as SrcKeyword } from '../../src/keywords/Keyword'

export class Keyword {
	stem: string
	count: number
	score: number

	constructor(init: object) {
		const opts = Object.assign({stem: '?!', count: 0, score: 0}, init)

		this.stem = opts.stem
		this.count = opts.count
		this.score = opts.score
	}

	compare(actual: SrcKeyword) {
		expect(actual.word).toEqual(this.stem)
		expect(actual.score).toBeCloseTo(this.score)
	}
}
