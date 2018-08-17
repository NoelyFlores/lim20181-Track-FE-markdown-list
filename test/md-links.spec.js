import sum from '../src/sum';

import filterURL from '../index';

const assert = require('assert');

describe('sum', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
describe('filterURL', () => {
  it('deberia encontrar un 2 links', () => {
    const text = '[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).';
    assert.deepEqual(filterURL(text), (['[Node.js](https://nodejs.org/es/)', 'Chrome](https://developers.google.com/v8/).']), 'break');
  });
});
