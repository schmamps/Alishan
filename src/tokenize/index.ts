const PUNCT = '[\\.\\?\\!\\;]'

/**
 * Standardize case, contractions, et al
 * @param word
**/
const normalizeWord = (word: string): string => {
	const cleanish = word.
		toLowerCase().
		replace(/[^a-z0-9\.]/gi, '').
		trim()

	return cleanish
}

/**
 * Split text into constituent words
 * @param text
 * @param simplify
 */
const listWords = (
	text: string,
	simplify: boolean = true
): string[] => {
	const postProc = (simplify) ? normalizeWord : (word: string) => word
	const listed = text.
		split(/[\s]+/).
		map((word) => word.replace(new RegExp(`${PUNCT}`, 'g'), '')).
		map(postProc).
		filter((word) => !!word)

	return listed
}

/**
 * Get list of sentences in `text`
 * @param body - content body
**/
const listSentences = (
	body: string
): string[] => {
	const noSemi = PUNCT.replace('\\;', '')
	const boundary = new RegExp('(?<=' + noSemi + '+)\\s+')
	const sentences = body.
		split(boundary).
		map((sent) => sent.trim()).
		filter((sent) => !!sent)

	return sentences
}

export const normalize = normalizeWord
export const sentences = listSentences
export const words = listWords
