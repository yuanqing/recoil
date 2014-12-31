'use strict';

var test = require('tape');
var recoil = require('../');

var fixture = './fixtures/foo.js';

test('mock a single property', function(t) {

  Array.isArray = 'bar';
  var foo = recoil(fixture, { obj: Array, key: 'isArray', val: 'mock' });
  t.equal(foo.isArray, 'mock', 'takes the value we specified');
  t.equal(Array.isArray, 'bar', 'restored to its original value');

  t.end();

});

test('mock multiple properties', function(t) {

  Array.isArray = 'bar';
  Array.forEach = 'baz';
  var opts = [
    { obj: Array,  key: 'isArray' }, // `val` defaults to `null`
    { obj: Array, key: 'forEach', val: 'mockery' }
  ];
  var foo = recoil(fixture, opts);
  t.equal(foo.isArray, 'polyfill', '`val` key defaults to a falsy value');
  t.equal(foo.forEach, 'mockery', 'takes the value we specified');
  t.equal(Array.isArray, 'bar', 'restored to its original value');
  t.equal(Array.forEach, 'baz', 'restored to its original value');

  t.end();

});
