import * as jzn from './jzn'

const STOP_WORDS: string[] = ((): string[] => {
	// for consistency with OolongT (somehow)
	const dummy = { words: [] }
	const path = jzn.locate('stop-words')
	const list = jzn.load(path)

	return Object.assign(dummy, list).words
})()

export default STOP_WORDS
