import { Score, SentenceSubscores, } from './Score'


export class Sentence {
	readonly text: string
	readonly index: number
	readonly score: Score

	constructor(
		text: string,
		sentIdx: number,
		subScores: SentenceSubscores,
	) {
		this.text = text.trim()
		this.index = Math.round(sentIdx)
		this.score = new Score(subScores)
	}

	get [Symbol.toStringTag]() {
		const max = 10
		const snip = this.text.substr(0, max).trim()
		const ellip = (this.text.length > snip.length) ? '...' : ''

		return `Sentence('${snip}${ellip}', ${this.index}, {...})`
	}
}
