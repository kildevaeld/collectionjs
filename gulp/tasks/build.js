'use strict';

const gulp = require('gulp'),
	typescript = require('gulp-typescript'),
	concat = require('gulp-concat'),
	merge = require('merge2'),
	sq = require('streamqueue'),
	webpack = require('gulp-webpack');
	
const project = typescript.createProject('tsconfig.json', {
	 declaration: true,
	 sortOutput: true,
	 typescript: require('typescript')
});
	
gulp.task('typescript', function () {
	let result = project.src('src/**/*.ts')
	.pipe(typescript(project))
	
	return merge([
		result.js.pipe(gulp.dest('lib')),
		result.dts.pipe(gulp.dest('lib'))
	]);
	
})

gulp.task('build', ['typescript'], function () {
	
	return gulp.src('./lib/index.js')
	.pipe(webpack({
		output: {
			filename: 'collection.js',
			libraryTarget: 'umd',
			library: 'collection'
		},
		externals: {
			eventsjs: 'eventsjs',
			orange: 'orange',
			'orange.request': {
				commonjs: 'orange.request',
				commonjs2: 'orange.request',
				amd: 'orange.request',
				root: ['orange', 'request']
			}
		}
	}))
	.pipe(gulp.dest('dist'))
	
})

gulp.task('build:bundle', ['typescript'], function () {
	
	return gulp.src('./lib/index.js')
	.pipe(webpack({
		output: {
			filename: 'collection.bundle.js',
			libraryTarget: 'umd',
			library: 'collection'
		},
		resolve: {
			alias: {
				'orange.request': process.cwd() + '/node_modules/orange.request/lib/browser.js'
			}
		}
	}))
	.pipe(gulp.dest('dist'))
	
})