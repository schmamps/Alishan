import * as fs from 'fs'


export interface JZNOptions {
	root?: string,
	ext?: string,
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
 * List full paths to strings in `paths` (arbitrary complexion)
 * use `opts` to set root and extension
 * @param name
 * @param opts
 * @returns string
 */
export const locate = (
	name: string,
	...args: any[]
): string => {
	// @ts-ignore
	const opts = (typeof(args[0]) === 'object') ? args[0] : {}
	const {root = `${__dirname}/data`, ext = '.json'} = opts

	return [root, `${name}${ext}`].join('/')
}

export const COUNTRIES = ['cambodia', 'cameroon', 'canada']
export const ESSAY = 'essay_snark'
