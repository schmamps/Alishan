/// <reference path="typing.d.ts" />
import {ScoringMemo, SummaryOptions, ScoringOptions, SentenceScore, ScoringCache} from 'Typing'
import * as keywords from './keywords'
import {positionValues as DEFAULT_POS_VALS} from './position-values'
import {ScoredSentence} from './Scored-Sentence'
import * as porter from './porter/stemmer'
import * as stopper from './stop-words'
import * as tokenize from './tokenize'


export const IDEAL_LENGTH = 20
export const PRECISION = Math.pow(10, 6)

interface KeywordMatch {
	index: number,
	score: number,
}

/**
 * Sum passed args
 * @param a
 * @param b
 * @returns - sum of `a` and `b`
**/
const sum = (a: number, b: number): number => a + b

/**
 * Score `word` by match to keywords
 * @param word
 * @param keyStrs - string value of keywords
 * @param keyScores - keyword scores (indices correspond w/ words)
**/
const scoreWordByKeyWord = (
	word: string,
	keyStrs: string[],
	keyScores: number[],
) => {
	const idx = keyStrs.indexOf(word)

	return (idx < 0) ? 0 : keyScores[idx]
}

/**
 * Reduce `matches` to a total score
 * @param total - carried value
 * @param second
 * @param matchIdx
 * @param matches - all matches
**/
const sumMatches = (
	total: number,
	second: KeywordMatch,
	matchIdx: number,
	matches: KeywordMatch[]
): number => {
	if (matchIdx < 1) { return total }

	const first = matches[matchIdx - 1]
	const diff = second.index - first.index
	const add = (first.score * second.score) / Math.pow(diff, 2)

	return total + add
}

const listTitleStems = (
	title: string,
	stopWords?: string[]
): string[] => {
	const filter = stopper.createFilter(stopWords)

	return tokenize.
		words(title).
		filter(filter).
		map(porter.stem)
}

/**
 * Memoize content data
 * @param title - content title
 * @param opts - summary options
 * @param initial - intial data
 */
const memoizeContent = (
	title: string,
	opts: SummaryOptions,
	initial: ScoringMemo = {},
): ScoringCache => {
	const {
		titleWords = listTitleStems(title, opts.stopWords),
		keys = keywords.listTuple(initial.body || '', opts),
	} = initial

	return Object.assign(initial, {titleWords, keys})
}

/**
 *
 * @param sentenceWords
 * @param keyStrs
 */
const getDensityConstant = (
	sentenceWords: string[],
	keyStrs: string[]
): number => {
	const commonWordCount = Array.
		from(new Set(sentenceWords)).
		filter((word: string) => keyStrs.includes(word)).
		length;

	return commonWordCount + 1
}

/**
 * Score by keyword density
 * @param sentenceWords - words in sentence
 * @param keyStrs - string value of keywords
 * @param keyScores - keyword scores (indices correspond w/ words)
**/
const scoreDBS = (
	sentenceWords: string[],
	keyStrs: string[],
	keyScores: number[],
): number => {
	const matchKeywords = (
		word: string,
		index: number
	): KeywordMatch => {
		const score = scoreWordByKeyWord(word, keyStrs, keyScores)

		return {index, score}
	}

	const k = getDensityConstant(sentenceWords, keyStrs)
	const summ = sentenceWords.
		map(matchKeywords).
		filter((match) => match.score > 0).
		reduce(sumMatches, 0.0)
	const dbs = (1.0 / k * (k + 1.0)) * summ

	return dbs
}

/**
 * Score by summation
 * @param sentenceWords - words in sentence
 * @param keyStrs - string value of keywords
 * @param keyScores - score of keywords (must match keyStrs index!)
 * @param length - length of sentenceWords
**/
const scoreSBS = (
	sentenceWords: string[],
	keyStrs: string[],
	keyScores: number[],
	length?: number
): number => {
	const score = sentenceWords.
		map((word) => scoreWordByKeyWord(word, keyStrs, keyScores)).
		reduce(sum, 0)
	const inv = 1 / (length || sentenceWords.length)
	const share = score  // / 10

	return inv * share
}

/**
 * Score `sentenceWords` by keyword frequency
 * @param sentenceWords
 * @param keys
**/
const scoreByKeywords = (
	sentenceWords: string[],
	keys: [string[], number[]],
): number => {
	const {length} = sentenceWords
	if (length === 0) { return length }

	const [keyStrs, keyScores] = keys
	const dbs = scoreDBS(sentenceWords, keyStrs, keyScores)
	const sbs = scoreSBS(sentenceWords, keyStrs, keyScores, length)
	const kws = (sbs + dbs) * 5.0

	return kws
}

/**
 * Score by sentence length
 * @param sentenceLength
 * @param idealLength
**/
const scoreLength = (
	sentenceLength: number,
	idealLength: number
): number => {
	const diff = idealLength - Math.abs(idealLength - sentenceLength)

	return diff / idealLength
};

/**
 * Score sentence based on position
 * @param sentIdx
 * @param sentCount - length of sentence list
 * @param posScores - sentence position scores
**/
const scorePosition = (
	sentIdx: number,     // - 0-based index of sentence position in list
	sentCount: number,
	posScores: number[]
): number => {
	const quantiles = posScores.length
	const rank = Math.round(Math.ceil((sentIdx + 1) / sentCount * quantiles))

	return posScores[rank - 1]
}

/**
 * Score sentence of `sentenceWords` with `titleWords`
 * @param titleWords - words in title
 * @param sentenceWords - words in sentence
 * @param stopWords - list of stop words
**/
const scoreTitle = (
	titleWords: string[],
	sentenceWords: string[],
	stopWords: string[]
): number => {
	if (Math.min(titleWords.length, sentenceWords.length) === 0) {
		return 0
	}

	const count = sentenceWords.
		filter((word) => titleWords.indexOf(word) >= 0).
		filter(stopper.createFilter(stopWords)).
		length

	return (count === 0) ? count : count / titleWords.length
}

/**
 * Create composite total score
 * @param kwScore - frequency score
 * @param lenScore - length score
 * @param posScore - sentence position score
 * @param titleScore - title score
**/
const composeScore = (
	kwScore: number,
	lenScore: number,
	posScore: number,
	titleScore: number
): number => {
	const summed:number = ([
			titleScore * 1.5,
			kwScore * 2.0,
			lenScore * 0.5,
			posScore,
		]).
		reduce(sum, 0)

	// reduce jitter (was: `summed / 4`)
	return Math.round(summed / 4 * PRECISION) / PRECISION
}

/**
 * Score sentence `text` w/ options `opts`, memoized values, and position data
 * @param title - content title
 * @param text - sentence text
 * @param sentIdx - sentence index (0-based)
 * @param sentCount - number of sentences
 * @param opts - scoring options
 * @param memo - memoized content data
**/
const scoreSentence = (
	title: string,
	text: string,
	sentIdx: number,
	sentCount: number,
	opts: ScoringOptions = {},
	memo: ScoringMemo = {},
): SentenceScore => {
	const sentenceWords = tokenize.
		words(text).
		map(porter.stem)
	const {
		idealLength = IDEAL_LENGTH,
		stopWords = stopper.defaults,
		positionValues = DEFAULT_POS_VALS,
	} = opts
	const {titleWords, keys,} = memoizeContent(title, opts, memo)
	const base = {
		keyword: scoreByKeywords(sentenceWords, keys),
		length: scoreLength(sentenceWords.length, idealLength),
		title: scoreTitle(titleWords, sentenceWords, stopWords),
		position: scorePosition(sentIdx, sentCount, positionValues),
	}
	const total = composeScore(
		base.keyword,
		base.length,
		base.position,
		base.title
	)

	return Object.assign(base, {total})
}

/**
 * Score sentences in `text`, weighted by `title`
 * @param title - content title
 * @param body - content body
 * @param opts - summary options
**/
const scoreContent = (
	title: string,
	body: string,
	opts: SummaryOptions
): ScoredSentence[] => {
	const allSentences = tokenize.sentences(body)
	const sentCount = allSentences.length
	const memo = memoizeContent(title, opts, {body})
	const scoreScoped = (
		text: string,
		sentIdx: number
	) => scoreSentence(title, text, sentIdx, sentCount, opts, memo)

	const instantiate = (
		score: SentenceScore,
		sentIdx: number
	) => new ScoredSentence(
		allSentences[sentIdx],
		sentIdx,
		sentCount,
		score
	)

	return allSentences.
		map(scoreScoped).
		map(instantiate)
}

export const content = scoreContent
export const memoize = memoizeContent
export const sentence = scoreSentence
