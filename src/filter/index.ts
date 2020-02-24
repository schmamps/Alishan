export default function remove<T>(exclude: T[]) {
	const all = (items: T[]) => items.filter(one)
	const one = (item: T) => !exclude.includes(item)

	return {all, one,}  // ... or none! Exceptions eternally? Absolute None!
}
