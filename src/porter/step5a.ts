import {M, seq, vowel} from './patterns'
import {execRegExp,} from './util'

const notO = (stem: string): boolean => {
	const re = new RegExp('^' + seq.C + vowel + '[^aeiouwxy]$')

	return !re.test(stem)
}

const branch: StepBranch = {
	re: /^(.+?)e$/,
	handle: (word, re) => {
		const stem = execRegExp(re, word)[0]

		if (M.gt1.test(stem) || (M.eq1.test(stem) && notO(stem))) {
			return stem
		}

		return word
	}
}

export default [branch]
