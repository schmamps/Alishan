import {Keyword} from './Keyword'
import {KeywordTuple} from 'Typing'
import * as stopper from './stop-words'
import * as tokenize from './tokenize'


export const MINIMUM_RANK = 10

interface KeywordOptions {
	minimumRank?: number,
	stopWords?: string[],
}

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
	stopWords?: string[],
): [string, number][] => {
	const byStopWords = stopper.createFilter(stopWords)
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
 * @param {string} text
 * @param {KeywordOptions} - {count: # of returned keywords, stopWords}
**/
const listKeywords = (
	text: string,
	opts: KeywordOptions = {},
): Keyword[] => {
	const {minimumRank: minRank = MINIMUM_RANK, stopWords} = opts
	const allWords = tokenize.words(text)
	const keywords =
		countKeywords(allWords, stopWords).
		map((pair: [string, number]) => ({word: pair[0], freq: pair[1]})).
		map((kw) => new Keyword(kw.word, kw.freq, allWords.length))
	const threshold = getKeywordThreshold(keywords, minRank);

	return keywords.filter((kw) => kw.score >= threshold)
}

/**
 * List keywords in `text`, except tupled
 * @param {string} text
 * @param {KeywordOptions} - {count: # of returned keywords, stopWords}
 */
const listKeywordsTuple = (
	text: string,
	opts: KeywordOptions = {},
): KeywordTuple => {
	const list = listKeywords(text, opts)

	return [
		list.map((kw) => kw.word),
		list.map((kw) => kw.score)
	]
}

export const list = listKeywords
export const listTuple = listKeywordsTuple
