import { Stemmer, } from 'Typing'
import { Idiom, } from '../idiom/'
import filter from '../filter'
import { sum } from '../math'
import * as tokenize from '../tokenize'
import { Keyword } from './Keyword'

type KeywordCount = {[str: string]: number,}
type CountEntry = [string, number]

const getKeyStems = (
	body: string,
	stopWords: string[],
	stem: Stemmer,
): string[] => {
	const outStopWords = filter(stopWords).one

	return tokenize.words(body).filter(outStopWords).map(stem)
}

const countStems = (
	count: KeywordCount,
	stem: string
): KeywordCount => {
	count[stem] = (count[stem] ?? 0) + 1

	return count
}

export const list = (
	body: string,
	idiom: Idiom = new Idiom(),
): Keyword[] => {
	const stemCounts =
		getKeyStems(body, idiom.stopWords, idiom.stem).
		reduce(countStems, {})
	const wordCount = sum(Object.values(stemCounts))

	return Object.
		entries(stemCounts).
		map((entry: CountEntry) => {
			const [stem, count] = entry

			return new Keyword(stem, count, wordCount)
		})
}
