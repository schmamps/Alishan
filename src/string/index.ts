export const snip = (
	text: string,
	maxLen = 10
) => {
	const snip = text.substr(0, maxLen).trim()
	const ellip = (text.length > snip.length) ? '...' : ''

	return snip + ellip

}
