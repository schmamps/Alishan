export default (...strs: (string | string[])[]) => {
	const comps = strs.
		// @ts-ignore
		flat(Infinity).
		map((comp) => comp.toLowerCase()).
		map((comp) => comp.replace(/[\-\s]+/g, '-')).
		map((comp) => comp.replace(/^\-*(.*?)\-*$/, '$1')).
		map((comp) => comp.replace(/[^a-z\-_]/g, ''))

	return comps.join('/')
}
