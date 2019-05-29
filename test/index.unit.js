'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export eurekacoincore-lib', function() {
    var eurekacoincore = require('../');
    should.exist(eurekacoincore.lib);
    should.exist(eurekacoincore.lib.Transaction);
    should.exist(eurekacoincore.lib.Block);
  });
});
