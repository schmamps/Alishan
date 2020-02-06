import {vis as vowelInStem,} from './patterns'
import {execRegExp,} from './util'

const y: StepBranch = {
	re: /^(.+?)y$/,
	handle: (word, re) => {
		const stem = execRegExp(re, word)[0]

		if (vowelInStem.test(stem)) { return stem + 'i' }

		return word
	},
}

export default [y]
