/*!
 * jscover - test/jscover.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var jscover = require('../');
var should = require('should');
var path = require('path');
var fs = require('fs');


describe('jscover.test.js', function () {
  it('should coverage lib to lib-cov', function (done) {
    jscover('a', 'b', {}, function () {
      done();
    });
  });

  describe('utf8', function () {
    var source = path.join(__dirname, 'lib');
    var target = path.join(__dirname, 'lib-cov');
    it('should coverage lib to lib-cov', function (done) {
      jscover(source, target, null, function (err, output) {
        should.not.exist(err);
        should.not.exist(output);
        var regexp = fs.readFileSync(path.join(source, 'regexp.js'), 'utf8');
        fs.readFileSync(path.join(target, 'regexp.js'), 'utf8').should.include(regexp);
        var targetFoo = path.join(target, 'subdir', 'foo');
        require(path.join(source, 'subdir', 'foo')).hello.should.equal(require(targetFoo).hello);
        done();
      });
    });
  });
});