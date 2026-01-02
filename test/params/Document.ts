import * as jzn from './jzn'
import { Keyword as SampleKeyword } from './Keyword'
import { Sentence as SampleSentence } from './Sentence'


interface SampleSentenceText {
	text: string,
	words: string[],
	filtered: string[],
	keywords: string[],
}

export class Document {
	name: string
	title: SampleSentenceText
	keywords: SampleKeyword[]
	sentences: SampleSentence[]
	readonly topKeywordCount: number

	constructor(name: string) {
		this.name = name
		const path = jzn.locate(name)

		const data = Object.assign(
			{
				keywords: [],
				sentences: [],
				title: { text: '', words: [], filtered: [], keywords: [] },
				topKeywordCount: 0,
			},
			jzn.load(path)
		);

		const of = data.sentences.length

		this.title = data.title
		this.keywords = data.keywords.map((kw) => new SampleKeyword(kw))
		this.sentences = data.sentences.map((sent) => {
			return new SampleSentence(Object.assign({ of }, sent))
		})
		this.topKeywordCount = data.topKeywordCount
	}

	get body() {
		return this.
			sentences.
			map((sent) => sent.text).
			join('  ')
	}

	get topKeywords(): SampleKeyword[] {
		return this.keywords.filter((kw) => kw.count >= this.topKeywordCount)
	}

	getKeywordTuple(): [string[], number[]] {
		const top = this.topKeywords

		return [
			top.map((kw) => kw.stem),
			top.map((kw) => kw.score),
		]
	}
}

