/*
 * grunt-hash-res
 * git://github.com/mutian/grunt-hash-res.git
 *
 * Copyright (c) 2016 Mutian Wang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    hash_res: {
      options: {
        // force: true,
        // hashLen: 8
      },
      css: {
        options: {
          resDir: './test/fixtures',
          resReg: [
            /\.\.\/(images\/[^.]+\.(?:png|gif|jpg))(\??)/g,
            /\.\.\/(fonts\/[^.]+\.[\w]+)(\??)/g
          ]
        },
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/css',
            src: ['**/*.css'],
            dest: 'tmp/css'
          }
        ]
      },
      html: {
        options: {
            resDir: './test/fixtures',
            resReg: [
              /\/\/s.cctcdn.cn\/w\/1611\/(css\/[^.]+\.css)(\??)/g,
              /\/\/s.cctcdn.cn\/w\/1611\/(images\/[^.]+\.(?:png|gif|jpg))(\??)/g
            ]
        },
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/html',
            src: ['**/*.html'],
            dest: 'tmp/html'
          }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'hash_res', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
