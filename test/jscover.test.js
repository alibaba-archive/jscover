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

describe('jscover.test.js', function () {
  it('should coverage lib to lib-cov', function (done) {
    jscover('a', 'b', {}, done);
  });
});