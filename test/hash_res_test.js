'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.hash_res = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  css1: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/css/test.css');
    var expected = grunt.file.read('test/expected/css/test.css');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  css2: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/css/pages/home.css');
    var expected = grunt.file.read('test/expected/css/pages/home.css');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  html1: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/html/home.html');
    var expected = grunt.file.read('test/expected/html/home.html');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  html2: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/html/global/header.html');
    var expected = grunt.file.read('test/expected/html/global/header.html');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  }
};
