import filter from '../filter'
import { Idiom } from '../idiom'
import { snip } from '../string'
import { words } from '../tokenize'
import * as scoring from './scoring'
import { SentenceSubscores } from './Score'
import { Sentence } from './Sentence'


export class Scorer {
	readonly text: string
	readonly sentStems: string[] = []
	readonly subScores: SentenceSubscores
	idiom: Idiom
	index?: number

	_setSubs() {
		const dbs = 0
		const sbs = 0
		const length = scoring.length(
			this.sentStems.length,
			this.idiom.idealSentenceLength
		)
		const position = 0
		const title = 0

		return {dbs, sbs, length, position, title}
	}

	stemText(text: string) {
		return words(text).map(this.idiom.stem)
	}

	stemTitle(title: string) {
		const outStopWords = filter(this.idiom.stopWords).one

		return this.
			stemText(title).
			filter(outStopWords)
	}

	constructor(
		text: string,
		idiom?: Idiom
	) {
		this.text = text.trim()
		this.idiom = idiom ?? new Idiom()

		this.sentStems = this.stemText(this.text)
		this.subScores = this._setSubs()
	}

	setKeywords(
		kwStrs: string[],
		kwScores: number[],
	): Scorer {
		const sentStems = this.sentStems
		const { length } = sentStems

		if (length < 1) { return this }

		this.subScores.dbs = scoring.dbs(sentStems, kwStrs, kwScores)
		this.subScores.sbs = scoring.sbs(sentStems, kwStrs, kwScores, length)

		return this
	}

	setPosition(
		sentIdx: number,
		sentCount: number,
	): Scorer {
		const idx = Math.round(sentIdx)
		const of = Math.round(sentCount)

		if (of - idx < 1 || idx < 0) {
			throw new Error([
				'invalid sentence position:',
				`Array(${sentCount})[${sentIdx}]`
			].join(' '))
		}

		this.index = idx
		this.subScores.position = scoring.position(
			idx,
			of,
			this.idiom.positionScores
		)

		return this
	}

	_scoreTitleStems(
		titleStems: string[],
	) {
		const count = this.sentStems.
			filter((word) => titleStems.includes(word)).
			length

		return (count === 0) ? count : count / titleStems.length
	}

	setTitle(
		title: string,
	): Scorer {
		const titleStems = this.stemTitle(title)

		if (titleStems.length === 0) {
			this.subScores.title = 0

			return this
		}

		this.subScores.title = this._scoreTitleStems(titleStems)

		return this
	}

	getSentence() {
		try {
			return new Sentence(this.text, this.index!, this.subScores)
		}
		catch (e) {
			throw new Error([
				`error scoring sentence '${snip(this.text)}': `,
				e.toString()
			].join(' '));
		}
	}

	get [Symbol.toStringTag]() {
		return `Scorer('${snip(this.text)}')`
	}
}
