import { Stemmer } from 'Typing'
import { stem as PORTER_STEMMER } from '../porter/'

export type IdiomOptions = {
	name?: string,
	tag?: string,
	idealSentenceLength?: number,
	minimumKeywordRank?: number,
	positionScores?: number[],
	stopWords?: string[],
	stem?: Stemmer,
}

interface IdiomDefaults extends IdiomOptions {
	name: string,
	tag: string,
	idealSentenceLength: number,
	minimumKeywordRank: number,
	positionScores: number[],
	stopWords: string[],
	stem: Stemmer,
}

export const DEFAULTS: IdiomDefaults = {
	name: 'default',
	tag: 'en-US',
	idealSentenceLength: 20,
	minimumKeywordRank: 10,
	positionScores: [
		0.17,
		0.23,
		0.14,
		0.08,
		0.05,
		0.04,
		0.06,
		0.04,
		0.04,
		0.15,
	],
	stem: PORTER_STEMMER,
	stopWords: [
		// misc
		'-', ' ', ',', '.',
		'a', 'e', 'i', 'o', 'u', 't',
		// '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		// date
		'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun',
		'monday', 'tuesday', 'wednesday', 'thursday',
		'friday', 'saturday', 'sunday',
		'january', 'february', 'march', 'april',
		'may', 'june', 'july', 'august',
		'september', 'october', 'november', 'december',
		// A-D
		'about', 'above', 'across', 'after', 'afterwards', 'again',
		'against', 'all', 'almost', 'alone', 'along', 'already',
		'also', 'always', 'am', 'among', 'amongst', 'amoungst',
		'amount', 'an', 'and', 'another', 'any', 'anyhow', 'anyone',
		'anything', 'anyway', 'anywhere', 'are', 'around', 'as', 'at',
		'back', 'be', 'became', 'because', 'become', 'becomes', 'becoming',
		'been', 'before', 'beforehand', 'behind', 'being', 'below', 'beside',
		'besides', 'between', 'beyond', 'both', 'bottom', 'but', 'by',
		'call', 'can', 'can\'t', 'cannot', 'co', 'con', 'could', 'couldn\'t',
		'de', 'describe', 'detail', 'did', 'do', 'done', 'down', 'due', 'during',
		// E-H
		'each', 'eg', 'eight', 'either', 'eleven', 'else',
		'elsewhere', 'empty', 'enough', 'etc', 'even', 'ever',
		'every', 'everyone', 'everything', 'everywhere', 'except',
		'few', 'fifteen', 'fifty', 'fill', 'find', 'fire',
		'first', 'five', 'for', 'former', 'formerly', 'forty',
		'found', 'four', 'from', 'front', 'full', 'further',
		'get', 'give', 'go', 'got',
		'had', 'has', 'hasnt', 'have', 'he', 'hence', 'her', 'here',
		'hereafter', 'hereby', 'herein', 'hereupon', 'hers', 'herself',
		'him', 'himself', 'his', 'how', 'however', 'hundred',
		// I-N
		'i', 'ie', 'if', 'in', 'inc', 'indeed', 'into',
		'is', 'it', 'it\'s', 'its', 'itself',
		'just',
		'keep',
		'last', 'latter', 'latterly', 'least', 'less', 'like', 'ltd',
		'made', 'make', 'many', 'may', 'me', 'meanwhile',
		'might', 'mill', 'mine', 'more', 'moreover', 'most',
		'mostly', 'move', 'much', 'must', 'my', 'myself',
		'name', 'namely', 'neither', 'never', 'nevertheless',
		'new', 'next', 'nine', 'no', 'nobody', 'none', 'noone',
		'nor', 'not', 'nothing', 'now', 'nowhere',
		// O-T
		'of', 'off', 'often', 'on', 'once', 'one', 'only', 'onto', 'or', 'other',
		'others', 'otherwise', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
		'part', 'people', 'per', 'perhaps', 'please', 'put',
		'rather', 're',
		'said', 'same', 'see', 'seem', 'seemed', 'seeming', 'seems',
		'several', 'she', 'should', 'show', 'side', 'since', 'sincere',
		'six', 'sixty', 'so', 'some', 'somehow', 'someone', 'something',
		'sometime', 'sometimes', 'somewhere', 'still', 'such',
		'take', 'ten', 'than', 'that', 'the', 'their', 'them', 'themselves',
		'then', 'thence', 'there', 'thereafter', 'thereby', 'therefore', 'therein',
		'thereupon', 'these', 'they', 'thick', 'thin', 'third', 'this', 'those',
		'though', 'three', 'through', 'throughout', 'thru', 'thus', 'to',
		'together', 'too', 'top', 'toward', 'towards', 'twelve', 'twenty', 'two',
		// U-Z
		'un', 'under', 'until', 'up', 'upon', 'us', 'use',
		'very', 'via',
		'want', 'was', 'we', 'well', 'were', 'what', 'whatever', 'when',
		'whence', 'whenever', 'where', 'whereafter', 'whereas', 'whereby',
		'wherein', 'whereupon', 'wherever', 'whether', 'which', 'while',
		'whither', 'who', 'whoever', 'whole', 'whom', 'whose', 'why',
		'will', 'with', 'within', 'without', 'would',
		'yet', 'you', 'your', 'yours', 'yourself', 'yourselves',
	],
}

export class Idiom {
	name: string
	tag: string
	idealSentenceLength: number
	minimumKeywordRank: number
	positionScores: number[]
	stopWords: string[]
	stem: Stemmer

	constructor(opts: IdiomOptions = {}) {
		const {
			name,
			tag,
			idealSentenceLength,
			minimumKeywordRank,
			positionScores,
			stopWords,
			stem,
		} = Object.assign({}, DEFAULTS, opts)

		this.name = name
		this.tag = tag
		this.idealSentenceLength = idealSentenceLength
		this.minimumKeywordRank = minimumKeywordRank
		this.positionScores = positionScores
		this.stopWords = stopWords
		this.stem = stem
	}
}
