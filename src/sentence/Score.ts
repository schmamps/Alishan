import * as scoring from './scoring'


export interface SentenceSubscores {
	dbs?: number
	sbs?: number
	length?: number,
	position?: number,
	title?: number,
}

const die = (undef: string[][]) => {
	const keys = undef.
		map((tuple) => tuple[0]).
		join(', ')

	throw new Error(`uninitialized sentence subscores [${keys}]`)
}

const reprParams = (inst: Score) => {
	return `{
		dbs: ${inst.dbs},
		sbs: ${inst.sbs},
		length: ${inst.length},
		position: ${inst.position},
		title: ${inst.title},
	}`.replace(/[\n\r\t]+/g, ' ')
}

export class Score {
	readonly dbs: number
	readonly sbs: number
	readonly keyword: number
	readonly length: number
	readonly position: number
	readonly title: number
	readonly total: number

	constructor(comps: SentenceSubscores) {
		const undef = Object.
			values(comps).
			map((x: any) => [String(x), typeof(x)]).
			filter((tuple: string[]) => tuple[1] === 'undefined')

		if (undef.length > 0) { die(undef) }

		// subs
		this.dbs = comps.dbs!
		this.sbs = comps.sbs!
		this.length = comps.length!
		this.position = comps.position!
		this.title = comps.title!

		// composites
		this.keyword = scoring.keywords(this.dbs, this.sbs)
		this.total = scoring.total(
			this.keyword,
			this.length,
			this.position,
			this.title
		)
	}

	toString() { return String(this.total) }

	get [Symbol.toStringTag]() {
		return `Score(${reprParams(this)})`
	}
}
