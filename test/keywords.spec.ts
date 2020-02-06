import {PRECISION, Keyword} from '../src/Keyword';
import * as keywords from '../src/keywords';
import * as jzn from './util/jzn';


const compareScore = (
	actual: Keyword,
	expected: jzn.TestDocumentKeyword,
): boolean => {
	const [a, b] = [actual, expected].
		map((kw) => Math.round(kw.score * PRECISION));

	return a === b;
};

const compareKeywordList = (
	actual: Keyword[],
	expected: jzn.TestDocumentKeyword[]
): boolean => {
	if (actual.length > expected.length) {
		throw [
			'too many keywords',
			`${actual.length} (not ${expected.length})`
		].join(' ');
	}

	actual.forEach((a) => {
		const expMatch = expected.filter((e) => e.stem === a.word);
		const b = (expMatch.length === 1) ? expMatch[0] : false;

		if (!b) {
			throw `unexpected keyword '${a.word}'`;
		}

		if (!compareScore(a, b)) {
			throw [
				`'${a.word}' -`,
				`exp. score: ${b.score}`,
				`act. score: ${a.score}`
			].join(' ');
		}
	});

	return true;
};

const testList = (
	doc: jzn.TestDocument
) => {
	const compare = () => {
		let init: string[] = []
		const body = doc.
			sentences.
			reduce((kws, sent) => kws.concat(sent.keywords), init).
			join(' ')
		const path = jzn.locate('stop-words')[0]
		// @ts-ignore
		const stopWords: string[] = jzn.load(path).words
		const actual = keywords.list(body, {stopWords})
		const expected = doc.keywords;

		return compareKeywordList(actual, expected)
	}

	test(`${doc.title} keywords`, () => {
		expect(compare()).toEqual(true)
	})
};

jzn.
	locate('cambodia', 'cameroon', 'canada', 'essay_snark').
	map(jzn.load).
	forEach(testList);
