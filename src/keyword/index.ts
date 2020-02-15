import {Keyword} from './Keyword'
import {KeywordTuple} from 'Typing'
import * as tokenize from '../tokenize'
import * as DEFAULTS from './defaults'


interface KeywordOptions {
	minimumRank?: number,
	stopWords?: string[],
}

/**
 * Create word filter function
 * @param stopWords - scope for filter `(arg) => !stopWords.includes(arg)`
 */
const createWordFilter = (
	stopWords: string[],
) => (
	word: string,
): boolean => !stopWords.includes(word)

/**
 * Increment instance count of  `word` in `counted`
 * @param {StringNumberPair} counted - key: word, value: count
 * @param {string} word - word count to increment
 * @returns {Map.<string, number>} - updated count
**/
const countWord = (
	counted: Map<string, number>,
	word: string,
): Map<string, number> => {
	const count = 1 + (counted.get(word) || 0)
	counted.set(word, count)

	return counted
}

/**
 * Filter and count keywords from all words in content
 * @param allWords - all words in content
 * @param stopWords - words not to count
 */
const countKeywords = (
	allWords: string[],
	stopWords: string[],
): [string, number][] => {
	const byStopWords = createWordFilter(stopWords)

	const counted = allWords.
		filter(byStopWords).
		reduce(countWord, new Map()).
		entries()

	return Array.from(counted)
}

/**
 * Get minimum score for keyword ranked `minRank` or higher,
 * e.g. getKeywordThreshold([9, 8, 7, 7, 6], 3) === 7
 * @param keywords
 * @param minRank
 */
const getKeywordThreshold = (
	keywords: Keyword[],
	minRank: number,
) => {
	const scores = keywords.
		map((kw) => kw.score).
		sort((a, b) => (a > b) ? -1 : 1)
	const idx = Math.min(minRank, scores.length)

	return scores[idx]
}

/**
 * List keywords in `text`
 * @param {string} body
 * @param {KeywordOptions} - {count: # of returned keywords, stopWords}
**/
const listKeywords = (
	body: string,
	opts: KeywordOptions = {},
): Keyword[] => {
	const {
		minimumRank: minRank = DEFAULTS.minimumRank,
		stopWords = DEFAULTS.stopWords
	} = opts
	const allWords = tokenize.words(body)
	const keywords =
		countKeywords(allWords, stopWords).
		map((pair: [string, number]) => ({word: pair[0], freq: pair[1]})).
		map((kw) => new Keyword(kw.word, kw.freq, allWords.length))
	const threshold = getKeywordThreshold(keywords, minRank);

	return keywords.filter((kw) => kw.score >= threshold)
}

/**
 * List keywords in `text`, except tupled
 * @param {string} body
 * @param {KeywordOptions} - {count: # of returned keywords, stopWords}
 */
const listKeywordsTuple = (
	body: string,
	opts: KeywordOptions = {},
): KeywordTuple => {
	const list = listKeywords(body, opts)

	return [
		list.map((kw) => kw.word),
		list.map((kw) => kw.score)
	]
}

export const createFilter = createWordFilter
export const list = listKeywords
export const listTuple = listKeywordsTuple
