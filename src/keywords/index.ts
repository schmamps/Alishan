import { Stemmer } from 'Typing'
import * as tokenize from '../tokenize'
import * as MODULE_DEFAULTS from './defaults'
import * as kwFilter from './filter'
import { Keyword as ModuleClass } from './Keyword'


export interface KeywordOptions {
	minimumRank?: number,
	stopWords?: string[],
	stem?: Stemmer,
}

export const DEFAULTS = MODULE_DEFAULTS
export const filter = kwFilter
export class Keyword extends ModuleClass {}

const getKeywords = (
	allWords: string[],
	stopWords: string[],
	stem: Stemmer,
): string[] => {
	const filter = kwFilter.create(stopWords)

	return allWords.filter(filter).map(stem)
}

/**
 * Increment instance count of  `word` in `counted`
 * @param {Map.<string, number>} counted
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
 * @param stems - all words in content
 * @param stopWords - words not to count
 */
const countKeywords = (
	stems: string[],
): [string, number][] => {
	const counted = stems.
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
export const list = (
	body: string,
	opts: KeywordOptions = {},
): Keyword[] => {
	const {
		minimumRank: minRank = DEFAULTS.minimumRank,
		stopWords = DEFAULTS.stopWords,
		stem = DEFAULTS.stem,
	} = opts
	const allWords = tokenize.words(body)
	const stems = getKeywords(allWords, stopWords, stem)

	const keywords = countKeywords(stems).
		map((pair: [string, number]) => ({word: pair[0], freq: pair[1]})).
		map((kw) => new Keyword(kw.word, kw.freq, stems.length))
	const threshold = getKeywordThreshold(keywords, minRank);

	return keywords.filter((kw) => kw.score >= threshold)
}
