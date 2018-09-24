const gulp = require('gulp')
const git = require('gulp-git')
const exec = require('gulp-exec')
const del = require('del')

gulp.task('clone-content', function() {
  return git.clone('https://github.com/csumb/web-content', {
    args: '_web-content --depth 1'
  }, (err) => {
    if (err) throw err;
  })
})

gulp.task('clone-web-data', function() {
  return git.clone('https://github.com/csumb/web-data', {
    args: '_data --depth 1'
  }, (err) => {
    if (err) throw err;
  })
})

gulp.task('clean-data', function() {
  return del([
    './_data/**',
    './_web-content/**'
  ])
})

gulp.task('default', gulp.series('clean-data', 'clone-content', 'clone-web-data'))