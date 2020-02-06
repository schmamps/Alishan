const consonant = '[^aeiou]'
export const vowel = '[aeiouy]'
export const seq = {C: `${consonant}[^aeiouy]*`, V: `${vowel}[aeiou]*`}
const initialConsonant = `^(${seq.C})?`
const vc = seq.V + seq.C
export const M = {
	gt0: new RegExp(initialConsonant + vc),
	eq1: new RegExp(initialConsonant + vc + `(${seq.V})?$`),
	gt1: new RegExp(initialConsonant + vc.repeat(2)),
}
export const vis = new RegExp(initialConsonant + vowel)  // vowel in stem (s_v)
