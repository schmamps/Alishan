export const sum = (
	...vals: any
): number => {
	return vals.
		// @ts-ignore TS2339
		flat(Infinity).
		map(Number).
		reduce((sum: number, val: number) => sum + val, 0)
}

export const fix = (
	places: number,
	coeff: number = 1,
) => {
	const pow = Math.pow(10, places)

	return (val: number) => Math.round(val * pow * coeff) / pow
}
