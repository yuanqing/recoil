'use strict';

var callsite = require('callsite');
var each = require('lodash.foreach');
var path = require('path');
var requireUncached = require('require-uncached');

var recoil = function(filePath, opts) {

  // resolve `filePath`
  var calllingFile = callsite()[1].getFileName();
  filePath = path.resolve(path.dirname(calllingFile), filePath);

  // make `opts` an array
  opts = [].concat(opts).filter(Boolean);

  // mock the properties as specified in `opts`
  var memo = {};
  each(opts, function(opt, i) {
    var key = opt.key;
    var obj = opt.obj;
    memo[i] = obj[key];
    obj[key] = typeof opt.val !== 'undefined' ? opt.val : null;
  });

  // require the module at `filePath`
  var req = requireUncached(filePath);

  // restore the properties
  each(opts, function(opt, i) {
    opt.obj[opt.key] = memo[i];
  });

  return req;

};

module.exports = recoil;
