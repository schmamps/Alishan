import { DUMMY as SCORE_DUMMY, Score } from './Score'


const DUMMY = {
	text: '?!',
	words: ['?!'],
	filtered: ['?!'],
	keywords: ['?!'],
	stemmed: ['?!'],
	index: Infinity,
	of: Infinity,
	rank: Infinity,
	score: SCORE_DUMMY,
}

export class Sentence {
	readonly text: string
	readonly words: string[]
	readonly filtered: string[]
	readonly keywords: string[]
	readonly stemmed: string[]
	readonly index: number
	readonly of: number
	readonly rank: number
	readonly score: Score

	constructor(init: object) {
		const opts = Object.assign({}, DUMMY, init)

		this.text = opts.text
		this.words = opts.words
		this.filtered = opts.filtered
		this.keywords = opts.keywords
		this.stemmed = opts.stemmed
		this.index = opts.index
		this.of = opts.of
		this.rank = opts.rank
		this.score = new Score(opts.score)
	}
}
