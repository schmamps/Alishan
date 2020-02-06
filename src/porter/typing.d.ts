interface MatchHandler {
	(word: string, re: RegExp): string
}

interface StepBranch {
	re: RegExp,
	handle: MatchHandler,
}

interface Step {
	[index: number]: StepBranch
}

interface Substitution {
	[key: string]: string
}
