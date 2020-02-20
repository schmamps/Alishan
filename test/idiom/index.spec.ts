import * as idiom from '../../src/idiom'

test('exports', () => {
	expect(idiom.Idiom).not.toBeUndefined()
	expect(idiom.DEFAULTS).not.toBeUndefined()
})
