# grunt-hash-res v0.1.4

[![Build Status: Linux](https://travis-ci.org/mutian/grunt-hash-res.svg?branch=master)](https://travis-ci.org/mutian/grunt-hash-res)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/dcimk39rcyjtg8k8/branch/master?svg=true)](https://ci.appveyor.com/project/mutian/grunt-hash-res/branch/master)

> Hash static resource files (JS, CSS, images, fonts) and replace the reference url


## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hash-res --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hash-res');
```


## The "hash_res" task

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.


### Options

#### resDir
Type: `String`  
(Required)

Sets the base directory to find resource files.

#### resReg
Type: `Array`  
(Required)

Sets regular expressions to find reference urls in target files.
Example: `[ /\.\.\/(images\/[^.]+\.(?:png|gif|jpg))(\??)/g ]`, the first parentheses should match resource path which relative to `resDir`, and the sececond parentheses should match an optional query question mark.

#### force
Type: `Boolean`  
Default: `false`

If true, will ignore any errors.

#### hashLen
Type: `Number`  
Default: `7`


### Usage Examples

```js
grunt.initConfig({
  hash_res: {
    html: {
      options: {
          resDir: './src',
          resReg: [
            /\.\.\/(css\/[^.]+\.css)(\??)/g,
            /\.\.\/(images\/[^.]+\.(?:png|gif|jpg))(\??)/g,
            /\/\/cdn.com\/static\/(js\/[^.]+\.js)(\??)/g
          ]
      },
      files: [
        {
          expand: true,
          cwd: 'src/html',
          src: ['**/*.html'],
          dest: 'dist/html'
        }
      ]
    }
  }
});
```

Target file `src/html/demo.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>test</title>
  <link rel="stylesheet" href="../css/demo.css">
</head>
<body>
  <img src="../images/demo.png?type=2" alt="demo">
  <script src="//cdn.com/static/js/demo.js"></script>
</body>
</html>
```

Run `hash_res`, it will output `dist/html/demo.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>test</title>
  <link rel="stylesheet" href="../css/demo.css?v=2f8dx7d">
</head>
<body>
  <img src="../images/demo.png?v=s93jxu8&type=2" alt="demo">
  <script src="//cdn.com/static/js/demo.js?v=2h7h2gc"></script>
</body>
</html>
```


## Release History

 * 2016-12-06   v0.1.1   Published.
