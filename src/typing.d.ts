declare module "Typing" {
	export type KeywordTuple = [
		string[],
		number[]
	]

	export interface KeywordObject {
		word: string,
		score: number,
		count?: number,
	}

	export interface StringNumberPair {
		[key: string]: number,
	}

	export interface ScoringMemo {
		titleWords?: string[],
		keys?: KeywordTuple,
		body?: string,
	}

	export interface ScoringCache {
		titleWords: string[],
		keys: KeywordTuple,
	}

	export interface ScoringOptions {
		idealLength?: number,
		stopWords?: string[],
		positionValues?: number[],
	}

	export interface SentenceScore {
		keyword: number,
		length: number,
		position: number,
		title: number,
		total: number
	}

	export interface SummaryOptions extends ScoringOptions {
		returnCount?: number,
	}
}
