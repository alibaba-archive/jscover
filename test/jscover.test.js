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
var fse = require('fs-extra');


describe('jscover.test.js', function () {
  var source = path.join(__dirname, 'lib');
  var target = path.join(__dirname, 'lib-cov');

  beforeEach(function () {
    fse.removeSync(target);
  });

  it('should coverage lib to lib-cov', function (done) {
    should.ok(!fs.existsSync(target));
    jscover(source, target, null, function (err, stdout) {
      should.not.exist(err);
      should.not.exist(stdout);
      should.ok(fs.existsSync(target));
      done();
    });
  });

  it('should coverage lib to lib-cov with --exclude=subdir', function (done) {
    should.ok(!fs.existsSync(target));
    should.ok(!fs.existsSync(path.join(target, 'subdir')));
    jscover(source, target, ['--exclude=subdir'], function (err, stdout) {
      should.not.exist(err);
      should.not.exist(stdout);
      should.ok(fs.existsSync(target));
      should.ok(!fs.existsSync(path.join(target, 'subdir')));
      done();
    });
  });

  it('should return stdout when args missing', function (done) {
    jscover('', null, {}, function (err) {
      should.exist(err);
      err.name.should.equal('JSCoverError');
      err.message.should.equal("Source directory '' is invalid");
      done();
    });
  });

  it('should return error when dir not exists', function (done) {
    jscover('a', 'b', {}, function (err) {
      should.exist(err);
      err.name.should.equal('JSCoverError');
      err.message.should.equal("Source directory 'a' is invalid");
      done();
    });
  });

  describe('utf8', function () {
    it('should coverage no-ascii char success', function (done) {
      should.ok(!fs.existsSync(target));
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