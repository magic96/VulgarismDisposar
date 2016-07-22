# VulgarismDisposer
[![Build Status](https://travis-ci.org/magic96/VulgarismDisposer.svg?branch=master)](https://travis-ci.org/magic96/VulgarismDisposer)
[![Dependency Status](https://david-dm.org/magic96/VulgarismDisposer.svg)](https://david-dm.org/magic96/VulgarismDisposer)
[![devDependency Status](https://david-dm.org/magic96/VulgarismDisposer/dev-status.svg)](https://david-dm.org/magic96/VulgarismDisposer#info=devDependencies)



Library to disposing unwanted phrases from strings.

## Usage
```js
import { default as VulgarismDisposer } from 'vulgarism-disposer';

const disposar = new VulgarismDisposer(['some unwanted phrase']);
disposar.encode('blabla some unwanted phrase').then(console.log); // 'blabla [vulgarism#0]'
disposar.decode('blabla [vulgarism#0]'.then(console.log)); // 'blabla some unwanted phrase'
```