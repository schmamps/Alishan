import {applySuffix, joinKeys,} from './util'


const SUFFIXES: Substitution = {
	ational: 'ate',
	tional: 'tion',
	enci: 'ence',
	anci: 'ance',
	izer: 'ize',
	bli: 'ble',
	alli: 'al',
	entli: 'ent',
	eli: 'e',
	ousli: 'ous',
	ization: 'ize',
	ation: 'ate',
	ator: 'ate',
	alism: 'al',
	iveness: 'ive',
	fulness: 'ful',
	ousness: 'ous',
	aliti: 'al',
	iviti: 'ive',
	biliti: 'ble',
	logi: 'log',
}

const branch: StepBranch = {
	re: new RegExp(`^(.+?)(${joinKeys(SUFFIXES)})$`),
	handle: (word, re) => applySuffix(word, re, SUFFIXES),
}

export default [branch]
