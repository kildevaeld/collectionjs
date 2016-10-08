'use strict';

const gulp = require('gulp');

gulp.task('watch', () => {
  gulp.watch('./src/**/*.ts', ['build:bundle']);
})