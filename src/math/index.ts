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
	const multiple = Math.pow(10, places) * coeff

	return (val: number) => Math.round(val * multiple) / multiple
}
