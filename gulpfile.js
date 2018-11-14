const gulp = require('gulp')
const git = require('gulp-git')
const exec = require('gulp-exec')
const del = require('del')
const fs = require('fs')
const _ = require('lodash')

gulp.task('clone-content', function() {
  return git.clone(
    `https://${process.env.GITHUB_TOKEN}@github.com/csumb/web-content.git`,
    {
      args: '_web-content --depth 1',
    },
    err => {
      if (err) throw err
      process.exit(1)
    }
  )
})

gulp.task('clone-web-data', function() {
  return git.clone(
    `https://${process.env.GITHUB_TOKEN}@github.com/csumb/web-data.git`,
    {
      args: '_data --depth 1',
    },
    err => {
      if (err) throw err
      process.exit(1)
    }
  )
})

gulp.task('clean-data', function() {
  return del(['./_data/**', './_web-content/**'])
})

gulp.task(
  'default',
  gulp.series('clean-data', 'clone-content', 'clone-web-data')
)
