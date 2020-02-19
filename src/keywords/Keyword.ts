import * as math from '../math'
import { precision as PRECISION } from './defaults'

// @ts-ignore TS2556
const fix = math.fix(...PRECISION)

/**
 * Score keyword by relative frequency
 * @param freq - # instances of keyword
 * @param wordCount - total word count
 */
const scoreKeyword = (
	freq: number,
	wordCount: number
): number => {
	const floaty = freq / wordCount * 1.5 // + 1?

	return fix(floaty)
}

export class Keyword {
	_word: string
	_score: number

	constructor(word: string, freq: number, wordCount: number) {
		this._word = word
		this._score = scoreKeyword(freq, wordCount)
	}

	get word(): string {
		return this._word
	}

	get score(): number {
		return this._score
	}

	toString() {
		return this._word
	}
}
