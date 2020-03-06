import { Content } from './content'
import { Idiom, IdiomOptions } from 'idiom/Idiom';

export type SummaryOptions = IdiomOptions & {returnCount: number}

/**
 * Summarize `body`
 * @param {string} title - content title
 * @param {string} body - content body
 * @param {SummaryOptions} options
 */
export const summarize = (
	body: string,
	title: string,
	opts: SummaryOptions = {returnCount: 5},
): string[] => {
	const content = new Content(body, title, new Idiom(opts))

	if (content.sentences.length === 0) { return [] }

	return content.summarize(opts.returnCount)
}
