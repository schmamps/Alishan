/**
 * Is host localhost?
 * @returns {Boolean}
 */
function isLocalhost() {
	const local = /(localhost|127\.0\.0\.1)/;
	const {host} = window.location;

	return local.test(host);
}

/**
 * Create error displaying function
 * @param {string} msg
 * @returns {function}
 */
function createErrorDisplay(msg) {
	function displayError(...args) {
		console.group(`Error: ${msg}`);
		console.dir(args);
		console.groupEnd();
	}

	return displayError;
}

/**
 * Get, empty, and return parent of sentence list
 * @returns {HTMLOListElement}
 */
function resetTeasers() {
	const teasers = document.getElementById('summary-sentences');

	while (teasers.lastChild) {
		teasers.removeChild(teasers.lastChild);
	}

	return teasers;
}

/**
 * Append `<${tagName}>${textContent}</${tagName}>` to `parent`
 * @param {HTMLElement} parent
 * @param {string} textContent
 * @param {string} tagName
 */
const appendElement = (parent, textContent, tagName = 'li') => {
	const child = document.createElement(tagName);
	child.textContent = textContent;

	parent.appendChild(child);
};

/**
 * Summarize text
 */
function getSummary() {
	const teasers = resetTeasers();
	const title = document.getElementById('title').value;
	const text = document.getElementById('content').value;
	const returnSpec = document.getElementById('returnCount').value;
	const returnCount = Number(returnSpec) || 3;
	const append = (sentence) => appendElement(teasers, sentence);

	const sentences = alishan.summarize(title, text, {returnCount});

	sentences.forEach(append);
}

/**
 * Join array `arr` with options `opts`
 * @param {string[]} arr - strings
 * @param {?object} opts - {
 * 		`sep`(arator),
 * 		`wrap`(around element),
 * 		`prop`(erty of element)}
 */
function joinArray(arr, opts = {}) {
	const {sep = ', ', wrap = false, prop = false} = opts;

	return arr.
		map((item) => (prop) ? item[prop] : item).
		map((item) => (wrap) ? `${wrap}${item}${wrap}` : item).
		join(sep);
}

const dummy = {
	/**
	 * Get relative path to random element in `docs`
	 * @param {string[]} docs
	 * @returns {Promise}
	 */
	getPath: function(docs) {
		const onError = createErrorDisplay(
			`resolving path in ${joinArray(docs, {wrap: '\''})}`);

		return Promise.
			resolve(Math.floor(Math.random() * docs.length)).
			then((idx) => `${docs[idx]}.json`).
			then((filename) => ['..', 'test', 'data', filename].join('/')).
			catch(onError);
	},
	/**
	 * Fetch data at `path`
	 * @param {string} path
	 * @returns {Promise} - response from fetch()
	 */
	fetch: function(path) {
		const onError = createErrorDisplay(
			`unable to fetch ${path}`);

		return Promise.
			resolve(path).
			then(fetch).
			catch(onError);
	},
	/**
	 * Parse data from `response`
	 * @param {object} response
	 * @returns {Promise} parsed JSON
	 */
	load: function(response) {
		const onError = createErrorDisplay(
			'error loading response data');

		return Promise.
			resolve(response.text()).
			then(JSON.parse).
			catch(onError);
	},
	/**
	 * Populate fields with `data`
	 * @param {object} data - parsed JSON
	 */
	populate: function(data) {
		const body = joinArray(data.sentences, {sep: ' ', prop: 'text'});

		document.
			getElementById('title').
			value = data.title.text;
		document.
			getElementById('content').
			value = body;
		document.
			getElementById('returnCount').
			max = data.sentences.length;
		document.
			getElementById('summarize').
			click();
	}
};

/**
 * Try populating form with sample data
 */
function tryPopulate() {
	Promise.
		resolve(['cambodia', 'canada', 'cameroon', 'essay_snark']).
		then(dummy.getPath).
		then(dummy.fetch).
		then(dummy.load).
		then(dummy.populate);
}

/**
 * Initialize page
*/
document.addEventListener('readystatechange', () => {
	if (document.readyState !== 'complete') { return; }

	document.
		getElementById('summarize').
		addEventListener('click', getSummary);

	if (isLocalhost()) {
		tryPopulate();
	}
});
