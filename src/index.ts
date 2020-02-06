import {content as scoreContent} from './score'
import {ScoredSentence} from './Scored-Sentence'
import {SummaryOptions} from 'Typing'


/**
 * Sort descending per `Array.prototype.sort()`
 * @param a {ScoredSentence}
 * @param b {ScoredSentence}
 */
const sortSentences = (
	a: ScoredSentence,
	b: ScoredSentence
): number => b.score.total - a.score.total

/**
 * Summarize `text`
 * @param {string} title - content title
 * @param {string} body - content body
 * @param {SummaryOptions} options
 */
const doSummary = (
	title: string,
	body: string,
	options: SummaryOptions,
): string[] => {
	const {returnCount = 5,} = options

	const summarized = scoreContent(title, body, options).
		sort(sortSentences).
		slice(0, returnCount).
		map(String)

	return summarized
}

/**
 * Summarize `body`
 * @param {string} title - content title
 * @param {string} body - content body
 * @param {SummaryOptions} options
 */
export const summarize = (
	title: string,
	text: string,
	opts: SummaryOptions
): string[] => {
	return (text.trim().length) ? doSummary(title, text, opts) : []
}
