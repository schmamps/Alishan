import {execRegExp, snipTail} from './util'
import {seq, M, vis as vowelInStem, vowel,} from './patterns'

const pastIrregular: StepBranch = {
	re: /^(.+?)eed$/,
	handle: (word, re) => {
		const fp1 = execRegExp(re, word)[0]

		if (M.gt0.test(fp1)) { return snipTail(word) }

		return word
	}
}

const pastAndPresent: StepBranch = {
	re: /^(.+?)(ed|ing)$/,
	handle: (word, re) => {
		const stem = execRegExp(re, word)[0]

		if (vowelInStem.test(stem)) {
			if (/(at|bl|iz)$/.test(stem)) {
				return `${stem}e`
			}

			if (new RegExp('([^aeiouylsz])\\1$').test(stem)) {
				return snipTail(stem)
			}

			if (new RegExp(`^${seq.C}${vowel}[^aeiouwxy]$`).test(stem)) {
				return `${stem}e`
			}

			return stem
		}

		return word
	}
}

export default [pastIrregular, pastAndPresent]
