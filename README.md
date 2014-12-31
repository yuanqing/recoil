# Recoil.js [![npm Version](http://img.shields.io/npm/v/recoil.svg?style=flat)](https://www.npmjs.org/package/recoil) [![Build Status](https://img.shields.io/travis/yuanqing/recoil.svg?style=flat)](https://travis-ci.org/yuanqing/recoil) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/recoil.svg?style=flat)](https://coveralls.io/r/yuanqing/recoil)

> Mock properties on global objects across a `require` call.

## Usage

A use case is to test a polyfill. Consider `foo.js`:

```js
// foo.js

module.exports = {
  isArray: Array.isArray || 'polyfill',
  forEach: Array.forEach || 'pony'
};
```

To get at the `polyfill` string of `isArray`, do:

```js
// 1.js

var opts = { obj: Array, key: 'isArray', val: null };
var foo = recoil('./foo.js', opts);

console.log(foo.isArray); //=> 'polyfill'
```

Recoil works as follows:

1. Save the original value of `Array.isArray`, then set `Array.isArray` to `null`.
3. Require `./foo.js` using [require-uncached](https://github.com/sindresorhus/require-uncached).
4. Restore `Array.isArray` to its original value.
5. Return the result of requiring `./foo.js`.

You can mock multiple properties too:

```js
// 2.js

var opts = [
  { obj: Array, key: 'isArray' }, // `val` defaults to `null`
  { obj: Array, key: 'forEach', val: 'mockery' }
];
var foo = recoil('./foo.js', opts);

console.log(foo.isArray); //=> 'polyfill'
console.log(foo.forEach); //=> 'mockery'
```

## API

### recoil(filePath, opts)

Returns the result of requiring the module at `filePath`, with properties to be mocked specified in `opts`.
- `filePath` &mdash; String.
- `opts` &mdash; A single object, or an array of objects. Each object specifies the properties to be mocked across the `require` call, eg. `{ obj: Array, key: 'forEach', val: 'mockery' }`. The `val` key defaults to `null`.

## Installation

Install via [npm](https://www.npmjs.org/):

```bash
$ npm i --save-dev recoil
```

## Changelog

- 0.1.0
  - Initial release

## License

[MIT license](https://github.com/yuanqing/recoil/blob/master/LICENSE)
