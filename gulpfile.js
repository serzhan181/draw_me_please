const gulp = require('gulp')
const { src, parallel, series } = require('gulp')

const paths = {
  js: 'js/**/*.js',
  html: 'public/**/*.html',
  styles: 'styles/**/*.css',
}

function js() {
  return src(paths.js).pipe(gulp.dest('./dist/js'))
}

function html() {
  return src(paths.html).pipe(gulp.dest('./dist'))
}

function styles() {
  return src(paths.styles).pipe(gulp.dest('./dist/styles'))
}

function watch() {
  return gulp.watch(Object.values(paths), parallel(js, styles, html))
}

exports.default = series(parallel(js, styles, html), watch)
