/*!
 * jscover - lib/jscover.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var path = require('path');

var root = path.dirname(__dirname);
var JSCoverPath = path.join(root, 'bin', 'JSCover-all.jar');
var JSCoverCommand = 'java -jar ' + JSCoverPath + ' -fs';

module.exports = function jscover(source, target, options, callback) {
  var cmd = JSCoverCommand + ' ' + source + ' ' + target;
  console.log(cmd)
  var child = exec(cmd, function (err, stdout, stderr) {
    var output = '';
    if (stdout) {
      output += stdout;
    }
    if (stderr) {
      output += stderr;
      if (!err) {
        err = new Error(stderr);
        err.name = 'JSCoverError';
      }
    }
    if (err) {
      return callback(err, output);
    }

    var success = !stdout && !stderr;
    if (!success) {
      return callback(null, output);
    }

    
  });
};