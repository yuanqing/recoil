var recoil = require('..');

var opts = [
  { obj: Array, key: 'isArray' }, // `val` defaults to `null`
  { obj: Array, key: 'forEach', val: 'mockery' }
];
var foo = recoil('./foo.js', opts);

console.log(foo.isArray); //=> 'polyfill'
console.log(foo.forEach); //=> 'mockery'
