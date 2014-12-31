var recoil = require('..');

var opts = { obj: Array, key: 'isArray', val: null };
var foo = recoil('./foo.js', opts);

console.log(foo.isArray); //=> 'polyfill'
