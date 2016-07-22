import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import convertCJS from 'rollup-plugin-commonjs';

export default {
  format: 'umd',
  entry: 'src/index.js',
  dest: 'dist/index.umd.js',
  moduleName: 'VulgarismDisposar',
  plugins: [
    nodeResolve(),
    convertCJS(),
    babel({ presets: ['es2015-rollup'] })
  ],
}