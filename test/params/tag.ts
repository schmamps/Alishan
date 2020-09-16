
type ArrayOfStringUnionStringArray = (string | string[])


/**
 * Flatten array of strings & string array members
 * (because `.flat(Infinity)` isn't passing)
**/
const flatten = (items: ArrayOfStringUnionStringArray[]): string[] => {
	const flat: string[] = [];

	for (const item of items) {
		flat.concat(item)
	}

	return flat;
};


export default (...strs: ArrayOfStringUnionStringArray[]) => {
	const comps = flatten(strs).
		map((comp) => comp.toLowerCase()).
		map((comp) => comp.replace(/[\-\s]+/g, '-')).
		map((comp) => comp.replace(/^\-*(.*?)\-*$/, '$1')).
		map((comp) => comp.replace(/[^a-z\-_]/g, ''))

	return comps.join('/')
}
