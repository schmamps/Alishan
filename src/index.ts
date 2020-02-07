import {content as scoreContent} from './score'
import {ScoredSentence} from './Scored-Sentence'
import {SummaryOptions} from 'Typing'


/**
 * @param scored - scored sentences
 * @param returnCount - minimum qualify rank for summary
 */
const getSummaryThreshold = (
	scored: ScoredSentence[],
	returnCount: number
): number => {
	if (scored.length < 1) { return -Infinity }

	const scores = scored.
		map((sent) => sent.score.total).
		sort((a, b) => b - a)

	return scores[Math.max(returnCount, scores.length) - 1]
}

/**
* @param {string} title - content title
* @param {string} body - content body
* @param {SummaryOptions} options
*/
const scoreSentences = (
   title: string,
   body: string,
   options: SummaryOptions
): ScoredSentence[] => {
	return scoreContent(title, body, options)
}

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
	const {returnCount = 5} = options
	const scored = scoreSentences(title, body, options)
	const threshold = getSummaryThreshold(scored, returnCount)

	return scored.
		filter((sent) => sent.score.total >= threshold).
		sort((a, b) => a.position - b.position).
		map(String)
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
	opts: SummaryOptions = {}
): string[] => {
	return (text.trim().length) ? doSummary(title, text, opts) : []
}
