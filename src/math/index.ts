export const sum = (
	a: number,
	b: number
): number => {
	return a + b
}

export const fix = (
	places: number,
	coeff: number = 1,
) => {
	const pow = Math.pow(10, places)

	return (val: number) => Math.round(val * pow * coeff) / pow
}
