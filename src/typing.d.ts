declare module "Typing" {
	export type KeywordTuple = [
		string[],
		number[]
	]

	export type PrecisionSpec = number[]

	export interface Stemmer {
		(str: string): string
	}

	export interface SummaryOptions {
		idealLength?: number,
		stopWords?: string[],
		positionScores?: number[],
	}
}
