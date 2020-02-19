import * as fs from 'fs'


export interface JZNOptions {
	root: string,
	ext: string,
}

/**
 * Read and parse JSON at `path`
 * @param {string} path - path to JSON
 * @returns {object} - parsed JSON
 */
export const load = (
	path: string,
): object => {
	// @ts-ignore
	return [fs.readFileSync, JSON.parse].
		reduce((val, func) => func(val), path)
}

/**
 * Stringify `data` and save at `path`
 * @param {*} data - data to store
 * @param {string} path - storage path
 * @param {number} space - formatting
 */
export const save = (
	data: object,
	path: string,
	space: any = 2,
) => {
	const json = JSON.stringify(data, null, space)

	fs.writeFile(path, json, () => {})
}

/**
 * @returns {object}
**/
const getOpts = (
	names: any[],
	args: any[]
): JZNOptions => {
	const opts = (names.length === args.length) ? {} : args.pop()
	const {root = 'test/data', ext = '.json'} = opts

	return {root, ext}
}

/**
 * List full paths to strings in `paths` (arbitrary complexion)
 * use `opts` to set root and extension
 * @param {...string} paths
 * @param {?Object=} opts - `{root: 'test/data', ext: '.json'}`
 * @returns {string[]}
 */
export const locate = (
...args: any[]
): string[] => {
	// @ts-ignore
	const flat = args.flat(Infinity)
	const names: string[] = flat.
		filter((arg: any) => typeof(arg) === 'string')
	const opts = getOpts(names, flat)

	return names.
		map((name) => [opts.root, `${name}${opts.ext}`].join('/'))
}