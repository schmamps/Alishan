import {M,} from './patterns'
import {snipTail,} from './util'

const ll:StepBranch = {
	re: /ll$/,
	handle: (word, _) => {
		if (M.gt1.test(word)) { return snipTail(word) }

		return word
	}
}

export default [ll]
