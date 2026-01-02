import { expect, test } from 'vitest'
import * as string from '../../src/string'

test('module', () => {
	expect(string.snip).not.toBeUndefined()
})
