import { Score as SrcScore } from '../../src/sentence/Score'


export const DUMMY = {
	dbs: Infinity,
	sbs: Infinity,
	length: Infinity,
	position: Infinity,
	title: Infinity,
	keyword: Infinity,
	total: Infinity
}

export class Score {
	readonly title: number
	readonly length: number
	readonly dbs: number
	readonly sbs: number
	readonly position: number
	readonly keyword: number
	readonly total: number

	constructor(init: object = {}) {
		const opts = Object.assign({}, DUMMY, init)

		this.title = opts.title
		this.length = opts.length
		this.dbs = opts.dbs
		this.sbs = opts.sbs
		this.position = opts.position
		this.keyword = opts.keyword
		this.total = opts.total
	}

	compare(actual: SrcScore) {
		expect(actual.dbs).toBeCloseTo(this.dbs)
		expect(actual.sbs).toBeCloseTo(this.sbs)
		expect(actual.length).toBeCloseTo(this.length)
		expect(actual.position).toBeCloseTo(this.position)
		expect(actual.title).toBeCloseTo(this.title)
		expect(actual.keyword).toBeCloseTo(this.keyword)
		expect(actual.total).toBeCloseTo(this.total)
	}
}
