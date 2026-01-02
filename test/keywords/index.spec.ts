import { expect, test } from 'vitest'
import * as keywords from '../../src/keywords/'

test('module', () => {
	expect(keywords.Keyword).not.toBeUndefined()
	expect(keywords.list).not.toBeUndefined()
	expect(keywords.PRECISION).not.toBeUndefined()
})
