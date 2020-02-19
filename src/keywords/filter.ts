export const create = (
	stopWords: string[],
) => (
	word: string,
): boolean => !stopWords.includes(word)
