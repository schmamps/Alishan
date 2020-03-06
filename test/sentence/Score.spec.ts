import { Score } from '../../src/sentence/Score'
import * as sample from '../params/sample'

const testSentenceScore = (expected: sample.SampleScore) => {
	const {dbs, sbs, length, position, title} = expected
	const comps = {dbs, sbs, length, position, title}

	return () => {
		const actual = new Score(comps)

		expected.compare(actual)
	}
}

const testSampleScores = (params: sample.Params) => {
	const [tag, doc] = params
	doc.sentences.forEach((sent: sample.SampleSentence, idx: number) => {
		test(`${tag}/sentence/${idx}`, testSentenceScore(sent.score))
	})
}

sample.
	params('constructor', sample.COUNTRIES).
	forEach(testSampleScores)
