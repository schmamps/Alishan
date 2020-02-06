/*********************************************************
Porter Stemmer - https://tartarus.org/martin/PorterStemmer/
*********************************************************/
import step1a from './step1a'
import step1b from './step1b'
import step1c from './step1c'
import step2 from './step2'
import step3 from './step3'
import step4 from './step4'
import step5a from './step5a'
import step5b from './step5b'

const runStep = (
	word: string,
	branches: StepBranch[],
	_: number
) => {
	for (let branch of branches) {
		if (branch.re.test(word)) {
			const stemmed = branch.handle(word, branch.re)

			return stemmed
		}
	}

	return word
}

/**
 * Apply Porter stemming to `word`
 * @param word
 */
const stemPorter = (word: string): string => {
	if (word.length < 3) { return word }

	const yInitial = word.charAt(0) === 'y'
	const stemmed = [
		step1a,
		step1b,
		step1c,
		step2,
		step3,
		step4,
		step5a,
		step5b,
	].reduce(runStep, yInitial ? 'Y' + word.substr(1) : word)

	if (yInitial) { return `y${stemmed.substr(1)}` }

	return stemmed
}

export const stem = stemPorter
