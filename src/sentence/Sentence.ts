import {SentenceScore} from 'Typing'


export class ScoredSentence {
	_text: string
	_score: SentenceScore
	_index: number
	_of: number

	constructor(
		text: string,
		sentIdx: number,
		sentCount: number,
		score: SentenceScore,
	) {
		this._text = text.trim()
		this._index = Math.round(sentIdx)
		this._of = Math.round(sentCount)
		this._score = score

		if (this._index < 0 || this._of - this._index <= 0) {
			throw `Invalid index [${this._index}] (len: ${this._of})`;
		}
	}

	get text() { return this._text }

	get position() { return this._index + 1 }

	get of() { return this._of }

	get score() { return this._score }

	toString() { return this.text }

	get [Symbol.toStringTag]() {
		const max = 10
		const {text} = this
		const snip = text.substr(0, max).trim()
		const ellip = (text.length > snip.length) ? '...' : ''

		return `ScoredSentence('${snip}${ellip}')`
	}
}
