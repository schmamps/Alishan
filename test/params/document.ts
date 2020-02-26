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

	constructor(name: string) {
		this.name = name
		const path = jzn.locate(name)

		const data = Object.assign(
			{
				keywords: [],
				sentences: [],
				title: {text: '', words: [], filtered: [], keywords: []}
			},
			jzn.load(path)
		);

		const of = data.sentences.length

		this.title = data.title
		this.keywords = data.keywords!.map((kw) => new SampleKeyword(kw))
		this.sentences = data.sentences.map((sent) => {
			return new SampleSentence(Object.assign({of}, sent))
		})
	}

	get body() {
		return this.
			sentences.
			map((sent) => sent.text).
			join('  ')
	}
}

