var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var path = require('path');
var run  = require('run-sequence');
var $    = require('gulp-load-plugins')({
  'rename': {
    'gulp-minify-css': 'minifyCSS'
  }
});


gulp.task('browserify', function(){
  var b = browserify({
    entries: ['./src/app/index.jsx'],
    transform: [reactify]
  });
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('style', function(){
  gulp.src('./node_modules/material-ui-stylus/index.styl')
    .pipe($.plumber(console.error.bind(console)))
    .pipe($.sourcemaps.init())
      .pipe($.stylus({
        errors: true
      }))
      .pipe($.autoprefixer({
        cascade: false,
        browsers: ['last 2 versions']
      }))
      // .pipe($.minifyCSS())
    .pipe($.sourcemaps.write())
    .pipe($.rename('material-ui.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('fonts', function() {
  return gulp.src('./node_modules/material-ui/src/less/material-design-fonticons/fonts/**')
    .pipe(gulp.dest('./dist/fonts/mdfonticon'));
});

gulp.task('muiFonts', function() {
  return gulp.src('./node_modules/material-ui/src/less/material-ui-icons/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('default', ['browserify', 'style', 'fonts', 'muiFonts']);
