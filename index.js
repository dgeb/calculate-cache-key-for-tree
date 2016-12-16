'use strict';

var crypto = require('crypto');
var stringify = require('json-stable-stringify');

/*
  This allows addon authors to easily utilize the "default" cache key generation
  system (e.g. if they implement `treeFor*` in a way that is totally safe), but
  still allows us to identify issues with the cache key generation and iterate
  (since both addon and ember-cli could use `^1.0.0` and float independently).
 */
module.exports = function calculateCacheKeyForTree(treeType, addonInstance, additionalCacheKeyParts) {
  var cacheKeyParts = [
    addonInstance.pkg,
    addonInstance.name,
    treeType
  ].concat(additionalCacheKeyParts);

  return crypto.createHash('md5').update(stringify(cacheKeyParts), 'utf8').digest('hex');
};
