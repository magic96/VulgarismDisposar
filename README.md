# VulgarismDisposar
Library to disposing unwanted phrases from strings.

## Usage
```js
import { default as VulgarismDisposar } from 'vulgarism-disposal';

const disposar = new VulgarismDisposar(['some unwanted phrase']);
disposar.encode('blabla some unwanted phrase').then(console.log); // 'blabla [vulgarism#0]'
disposar.decode('blabla [vulgarism#0]'.then(console.log)); // 'blabla some unwanted phrase'
```