import {M} from './patterns'
import {execRegExp,} from './util'

const testMValue = (
	subject: string,
	onFail: string,
): string => {
	if (M.gt1.test(subject)) { return subject }

	return onFail
}


const stateActionEtc: StepBranch = {
	re: new RegExp([
		'^(.+?)(al|ance|ence|er|ic|able|ible|ant',
		'|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$',
	].join('')),
	handle: (word, re) => {
		const stem = execRegExp(re, word)[0]

		return testMValue(stem, word)
	},
}

const participle: StepBranch = {
	re: /^(.+?)(s|t)(ion)$/,
	handle: (word, re) => {
		const stem = execRegExp(re, word, 1, 2).join('')

		return testMValue(stem, word)
	},
}

export default [stateActionEtc, participle]
