import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { default as config } from './es6.js';

config.format = 'umd';
config.dest = 'dist/index.umd.js';
config.plugins.push(babel({ presets: ['es2015-rollup'] }), uglify());

export default config;