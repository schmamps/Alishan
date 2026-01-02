import { expect, test } from 'vitest'
import * as sentence from '../../src/sentence/'

test('Scorer', () => {
	expect(sentence.Scorer).not.toBeUndefined()
})

test('Sentence', () => {
	expect(sentence.Sentence).not.toBeUndefined()
})
