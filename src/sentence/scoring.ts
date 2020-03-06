import { PrecisionSpec } from 'Typing'
import filter from '../filter'
import * as math from '../math'


export const PRECISION: PrecisionSpec = [6, .25]

interface KeywordMatch {
	index: number,
	score: number,
}


// reduce jitter in total (was: `summed / 4`)
// @ts-ignore TS2556
const fix = math.fix(...PRECISION)

/**
 * Score `word` by match to keywords
 * @param word
 * @param kwStrs - string value of keywords
 * @param kwScores - keyword scores (indices correspond w/ words)
**/
const scoreWordByKeyWord = (
	word: string,
	kwStrs: string[],
	kwScores: number[],
) => {
	const idx = kwStrs.indexOf(word)

	return (idx < 0) ? 0 : kwScores[idx]
}

/**
 * Reduce `matches` to a total score
 * @param total - carried value
 * @param second
 * @param matchIdx
 * @param matches - all matches
**/
const sumMatches = (
	total: number,
	second: KeywordMatch,
	matchIdx: number,
	matches: KeywordMatch[]
): number => {
	if (matchIdx < 1) { return total }

	const first = matches[matchIdx - 1]
	const diff = second.index - first.index
	const add = (first.score * second.score) / Math.pow(diff, 2)

	return total + add
}

/**
 *
 * @param sentenceWords
 * @param kwStrs
 */
const getDensityConstant = (
	sentenceWords: string[],
	kwStrs: string[]
): number => {
	const commonWordCount = Array.
		from(new Set(sentenceWords)).
		filter((word: string) => kwStrs.includes(word)).
		length;

	return commonWordCount + 1
}

/**
 * Score by keyword density
 * @param sentenceWords - words in sentence
 * @param kwStrs - string value of keywords
 * @param kwScores - keyword scores (indices correspond w/ words)
**/
export const dbs = (
	sentenceWords: string[],
	kwStrs: string[],
	kwScores: number[],
): number => {
	const matchKeywords = (
		word: string,
		index: number
	): KeywordMatch => {
		const score = scoreWordByKeyWord(word, kwStrs, kwScores)

		return {index, score}
	}

	const k = getDensityConstant(sentenceWords, kwStrs)
	const summ = sentenceWords.
		map(matchKeywords).
		filter((match) => match.score > 0).
		reduce(sumMatches, 0.0)
	const dbs = (1.0 / k * (k + 1.0)) * summ

	return dbs
}

/**
 * Score by summation
 * @param sentStems - words in sentence
 * @param kwStrs - string value of keywords
 * @param kwScores - score of keywords (indices correspond w/ kwStrs)
 * @param length - length of sentenceWords (micro-optimization)
**/
export const sbs = (
	sentStems: string[],
	kwStrs: string[],
	kwScores: number[],
	length?: number
): number => {
	const inv = 1 / (length ?? sentStems.length)
	const stemScores = sentStems.
		filter((stem) => kwStrs.includes(stem)).
		map((word) => scoreWordByKeyWord(word, kwStrs, kwScores))
	const sbs = inv * math.sum(stemScores)

	return sbs
}

/**
 * Compose keyword score
 * @param sentenceWords
 * @param keys
**/
export const keywords = (
	dbsScore: number,
	sbsScore: number,
): number => {
	return (dbsScore + sbsScore) * 5.0
}

/**
 * Score by sentence length
 * @param sentLength
 * @param idealLength
**/
export const length = (
	sentLength: number,
	idealLength: number
): number => {
	const diff = idealLength - Math.abs(idealLength - sentLength)

	return diff / idealLength
};

/**
 * Score sentence based on position
 * @param sentIdx
 * @param sentCount - length of sentence list
 * @param posScores - sentence position scores
**/
export const position = (
	sentIdx: number,     // - 0-based index of sentence position in list
	sentCount: number,
	posScores: number[]
): number => {
	const quantiles = posScores.length
	const rank = Math.round(Math.ceil((sentIdx + 1) / sentCount * quantiles))

	return posScores[rank - 1]
}

/**
 * Score sentence of `sentenceWords` with `titleWords`
 * @param titleWords - words in title
 * @param sentenceWords - words in sentence
 * @param stopWords - list of stop words
**/
export const title = (
	titleWords: string[],
	sentenceWords: string[],
	stopWords: string[]
): number => {
	if (Math.min(titleWords.length, sentenceWords.length) === 0) {
		return 0
	}

	const outStopWords = filter(stopWords).one
	const count = sentenceWords.
		filter((word) => titleWords.indexOf(word) >= 0).
		filter(outStopWords).
		length

	return (count === 0) ? count : count / titleWords.length
}

/**
 * Create composite total score
 * @param kwScore - frequency score
 * @param lenScore - length score
 * @param posScore - sentence position score
 * @param titleScore - title score
**/
export const total = (
	kwScore: number,
	lenScore: number,
	posScore: number,
	titleScore: number
): number => {
	const weighted = [
		titleScore * 1.5,
		kwScore * 2.0,
		lenScore * 0.5,
		posScore,
	]

	return fix(math.sum(weighted))
}
