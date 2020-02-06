import {applySuffix, joinKeys,} from './util'


const SUFFIXES: Substitution = {
	icate: 'ic',
	ative: '',
	alize: 'al',
	iciti: 'ic',
	ical: 'ic',
	ful: '',
	ness: '',
}

const branch: StepBranch = {
	re: new RegExp(`^(.+?)(${joinKeys(SUFFIXES)})$`),
	handle: (word, re) => applySuffix(word, re, SUFFIXES),
}

export default [branch]
