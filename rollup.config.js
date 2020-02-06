import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';

export default {
	input: 'src/index.ts',
	output: {
		dir: 'alishan',
		format: 'iife',
		name: 'alishan',
	},
	plugins: [
		typescript({
			lib: ['DOM', 'ES2017'],
			target: 'ES6'
		}),
		terser(),
	]
};
