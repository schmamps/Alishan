import { expect, test } from 'vitest'
import * as content from '../../src/content'

test('Content export', () => {
	expect(content.Content).not.toBeUndefined()
})
