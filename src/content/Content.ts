import { Idiom } from '../idiom'
import * as keywords from '../keywords'
import { getRankThreshold } from '../math'
import { Scorer, Sentence } from '../sentence'
import * as tokenize from '../tokenize'
import { Keyword } from 'keywords/Keyword'


const getMinimumRank = (
	rankSpec: number,
	sentCount: number,
): number => {
	let rank = rankSpec

	if (rankSpec > sentCount) {
		rank = sentCount
	}
	else if (rankSpec < 1) {
		rank = sentCount * rankSpec
	}

	return Math.round(rank)
}

const listTopKeywords = (
	kws: Keyword[],
	minRank: number,
): Keyword[] => {
	const scores = kws.map((kw) => kw.score)
	const threshold = getRankThreshold(scores, minRank)

	return kws.filter((kw) => kw.score >= threshold)
}

const listTopSentences = (
	sentences: Sentence[],
	minRank: number,
) => {
	const scores = sentences.map((sent) => sent.score.total)
	const threshold = getRankThreshold(scores, minRank)

	return sentences.filter((sent) => sent.score.total >= threshold)
}

export class Content {
	readonly title: string
	readonly sentences: string[]
	idiom: Idiom

	constructor(
		body: string,
		title: string,
		idiom?: Idiom,
	) {
		this.title = title
		this.sentences = tokenize.sentences(body)
		this.idiom = idiom ?? new Idiom()
	}

	get body(): string {
		return this.sentences.join(' ')
	}

	getKeywords(): Keyword[] {
		return keywords.list(this.body, this.idiom)
	}

	protected getTopKeywords(): Keyword[] {
		const kws = this.getKeywords()

		return listTopKeywords(kws, this.idiom.minimumKeywordRank)
	}

	protected getTopKeywordPairs(): [string[], number[]] {
		const top = this.getTopKeywords()

		return [
			top.map((kw) => kw.word),
			top.map((kw) => kw.score),
		]
	}

	protected scoreSentence(
		sentIdx: number,
		sentCount: number,
		kwStrs: string[],
		kwScores: number[],
	): Sentence {
		const text = this.sentences[sentIdx]
		const scorer = new Scorer(text, this.idiom).
			setKeywords(kwStrs, kwScores).
			setPosition(sentIdx, sentCount).
			setTitle(this.title)

		return scorer.getSentence()
	}

	score(): Sentence[] {
		const sentCount = this.sentences.length
		const [kwStrs, kwScores] = this.getTopKeywordPairs()
		const scoreSent = (_: any, sentIdx: number) => this.scoreSentence(
			sentIdx, sentCount, kwStrs, kwScores
		)

		return this.sentences.map(scoreSent)
	}

	/**
	 * Return text of highest-scored sentences in content order
	 * @param returnCount - min. sentence rank (coefficient of total if < 1)
	 */
	summarize(returnCount: number): string[] {
		const sentences = this.score()
		const minRank = getMinimumRank(returnCount, sentences.length)

		return listTopSentences(sentences, minRank).
			map((sent) => sent.text)
	}
}
