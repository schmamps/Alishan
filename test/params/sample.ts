import tag from './tag'
import { Document } from './Document'
import { Keyword } from './Keyword'
import { Score } from './Score'
import { Sentence } from './Sentence'


const countries = ['cambodia', 'cameroon', 'canada']
const essay = 'essay_snark'

export type Params = [string, Document]

export const params = (
	tagRoot: string,
	...names: any[]
): Params[] => {
	// TODO: Array.flat not recognized - TS2339
	return names.
		reduce((names, item) => names.concat(item), []).
		map(String).
		map((name: string) => [tag(tagRoot, name), new Document(name)])
}

export class SampleDocument extends Document {}
export class SampleKeyword extends Keyword {}
export class SampleSentence extends Sentence {}
export class SampleScore extends Score {}
export const COUNTRIES = countries
export const ESSAY = essay
export const LONG = COUNTRIES.concat(ESSAY)
