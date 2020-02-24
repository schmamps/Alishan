import { PrecisionSpec } from 'Typing'
import * as math from '../math'


export const PRECISION: PrecisionSpec = [12]

// @ts-ignore TS2556
const fix = math.fix(...PRECISION)

/**
 * Score keyword by relative frequency
 * @param freq - # instances of keyword
 * @param wordCount - total word count
 */
const scoreKeyword = (
	freq: number,
	wordCount: number,
): number => {
	const floaty = freq / wordCount * 1.5 // + 1?

	return fix(floaty)
}

export class Keyword {
	readonly word: string
	readonly score: number

	constructor(word: string, freq: number, wordCount: number) {
		this.word = word
		this.score = scoreKeyword(freq, wordCount)
	}

	toString() {
		return this.word
	}
}
