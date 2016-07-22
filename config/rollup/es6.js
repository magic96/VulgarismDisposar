import nodeResolve from 'rollup-plugin-node-resolve';
import convertCJS from 'rollup-plugin-commonjs';

export default {
  format: 'es',
  entry: 'src/index.js',
  dest: 'dist/index.es6.js',
  moduleName: 'VulgarismDisposar',
  plugins: [nodeResolve(), convertCJS()],
}