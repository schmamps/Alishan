import * as math from '../../src/math'

interface TestItem {
	params: any,
	test: Function,
}

type FixParams = [number, number, number, number?]
interface TestFix extends TestItem { params: FixParams[] }

type SumParams = [number, ...(number | number[])[]]
interface TestSum extends TestItem { params: SumParams[] }

const fix: TestFix = {
	params: [
		[1, 1, 10,],
		[1.5, 1.50000001, 4,],
		[1.50000001, 1.5000000149999, 8,],
		[6, 1.50000001, 6, 4],
	],
	test: (params: FixParams) => {
		const expected = params.shift()
		const arg = params.shift()
		test(`math.fix(${params})(${arg}) === ${expected}`, () => {
			// @ts-ignore
			const fix = math.fix(...params)
			const actual = fix(arg!)

			expect(actual).toEqual(expected)
		})
	},
}

const sum: TestSum = {
	params: [
		[2, 1, 1],
		[4, 2, 2],
		[6, 2, 2, 2],
		[8, 2, 2, [2, 2]],
		[10, [2, 2, 2, 2, 2]]
	],
	test: (params: SumParams) => {
		const expected = params.shift()
		const isArr = (arg: any) => Array.isArray(arg)
		const args = params.map((p) => isArr(p) ? `[${p!.toString()}]` : p!)

		test(`math.sum(${args.join(', ')}) === ${expected}`, () => {
			const actual = math.sum(...params)

			expect(actual).toEqual(expected)
		})
	},
}

const tests: TestItem[] = [
	fix,
	sum,
]

tests.forEach((item) => item.params.forEach(item.test))
