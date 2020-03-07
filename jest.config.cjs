module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	modulePathIgnorePatterns: ['src/.*', 'test/.+\.js'],
	globals: {
		'ts-jest': {
			diagnostics: {
				warnOnly: true,
			},
		},
	},
};
