const sub1: StepBranch = {
	re: /^(.+?)(ss|i)es$/,
	handle: (word, re) => word.replace(re, '$1$2'),
}

const sub2: StepBranch = {
	re: /^(.+?)([^s])s$/,
	handle: (word, re) => word.replace(re, '$1$2'),
}

export default [sub1, sub2]
