import { Content } from './content'
import { Idiom, IdiomOptions } from './idiom/Idiom';

export type SummaryOptions = IdiomOptions & {returnCount: number}

export const DEFAULTS: SummaryOptions = {returnCount: 5}

const getContent = (
	body: string,
	title: string,
	opts: IdiomOptions = {}
) => {
	return new Content(body, title, new Idiom(opts))
}

export const score = (
	body: string,
	title: string,
	opts: IdiomOptions = {}
) => {
	const content = getContent(body, title, opts)

	return content.score()
}

/**
 * Summarize `body`
 * @param {string} title - content title
 * @param {string} body - content body
 * @param {SummaryOptions} options
 */
export const summarize = (
	body: string,
	title: string,
	opts: SummaryOptions = DEFAULTS,
): string[] => {
	const content = getContent(body, title, opts)

	if (content.sentences.length < 1) { return [] }

	return content.summarize(opts.returnCount)
}
