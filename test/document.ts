import * as jzn from './jzn'


export interface SampleSentenceScore {
	title: number,
	length: number,
	dbs: number,
	sbs: number,
	position: number,
	keyword: number,
	total: number,
}

export interface SampleSentenceText {
	text: string,
	words: string[],
	filtered: string[],
	keywords: string[],
}

export interface SampleSentence extends SampleSentenceText {
	index: number,
	of: number,
	rank: number,
	score: SampleSentenceScore,
	stemmed: string[],
}

export interface SampleDocumentKeyword {
	stem: string,
	count: number,
	score: number,
}

export class SampleDocument {
	title: SampleSentenceText
	keywords: SampleDocumentKeyword[]
	sentences: SampleSentence[]

	constructor(path: string) {
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
		this.keywords = data.keywords!
		this.sentences = data.sentences.map((sent) => {
			return Object.assign({of}, sent)
		})
	}

	get body() {
		return this.
			sentences.
			map((sent) => sent.text).
			join('  ')
	}
}
