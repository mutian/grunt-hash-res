/*
 * Hash Resource
 * git://github.com/mutian/grunt-hash-res.git
 *
 * Copyright (c) 2016 Mutian Wang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');
  var crypto = require('crypto');
  var hashedRes = {};
  var getResVersion = function(path, hashLen, hash) {
    if (path in hashedRes) {
      return hashedRes[path];
    }

    if (grunt.file.exists(path)) {
      var fileContent = grunt.file.read(path);
      var md5 = crypto.createHash('md5').update(fileContent).digest('hex');
      hash = md5.slice(0, hashLen);
      grunt.log.write(path + ' ').ok(hash);
    } else {
      grunt.log.error('Resource file not found: ' + path);
    }

    hashedRes[path] = hash;
    return hash;
  };

  grunt.registerMultiTask('hash_res', 'Hash Resource', function() {
    var options = this.options();
    var force = options.force || false;
    var resDir = options.resDir;
    var resReg = options.resReg || [];
    var hashLen = options.hashLen || 7;
    var defaultHash = options.defaultHash || grunt.template.today("yymmddHHMM");

    if (! grunt.file.isDir(resDir)) {
      grunt.log.error('Resource directory not found.');
    }
    if (resReg.length === 0) {
      grunt.log.error('Resource expressions not found.');
    }

    this.files.forEach(function(file) {
      file.src.forEach(function(src) {
        if (! grunt.file.exists(src)) {
          grunt.log.error('Source file not found: "' + src + '"');
        }

        var content = grunt.file.read(src);
        if (content) {
          resReg.forEach(function(reg) {
            content = content.replace(reg, function(match, key, question) {
              if (typeof key === 'undefined') {
                return;
              }
              var resPath = path.join(resDir, key);
              var version = getResVersion(resPath, hashLen, defaultHash);
              return match.replace(/([^?]+)\??(.*)$/, '$1?v=' + version + (question === '?' ? '&' : ''));
            });
          });

          var dest = file.dest;
          dest = grunt.file.isDir(dest) ? dest + path.basename(src) : dest;
          grunt.file.write(dest, content);
          grunt.log.ok('File "' + dest + '" created.');
        }
      });
    });

    if (! force && this.errorCount) {
      return false;
    }
  });

};
