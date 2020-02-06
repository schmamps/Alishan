import {M} from './patterns'

export const execRegExp = (
	re: RegExp,
	word: string,
	...indices: number[]
): string[] => {
	try {
		const result = re.exec(word) || []

		const matches = ((indices.length) ? indices : [1]).
			map((idx) => result[idx])

		return matches
	}
	catch (_) {
		throw [
			`match(es) [${indices.join(', ')}]`,
			'not found:',
			`${re.toString()}.exec('${word}')`
		].join(' ')
	}
}

export const snipTail = (
	word: string,
	length: number = 1
): string => {
	const re = new RegExp(`.{${length}}$`)

	return word.replace(re, '')
}

export const joinKeys = (
	obj: object,
	joinStr: string = '|'
) => Object.
	keys(obj).
	join(joinStr)

export const applySuffix = (
	word: string,
	re: RegExp,
	suffixList: Substitution
): string => {
	const [stem, suffix] = execRegExp(re, word, 1, 2)

	if (!M.gt0.test(stem)) { return word }

	return stem + suffixList[suffix]
}
