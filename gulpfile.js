var gulp = require('gulp'),
    errorHandler = require('./gulp/tasks/errorHandler'),
    plugins = {},
    config = require('./gulp/config');
// sass/css plugins
plugins.sass = require('gulp-ruby-sass');
plugins.sourcemaps = require('gulp-sourcemaps');
plugins.autoprefixer = require('gulp-autoprefixer');
plugins.minifycss = require('gulp-minify-css');
plugins.pixrem = require('gulp-pixrem');

// js plugins
plugins.browserify = require('gulp-browserify');
plugins.babelify = require('babelify');
plugins.uglify = require('gulp-uglify');
plugins.mocha = require('gulp-mocha');

// misc plugins
plugins.filter = require('gulp-filter');
plugins.debug = require('gulp-debug');
plugins.concat = require('gulp-concat');
plugins.rename = require('gulp-rename');
plugins.notify = require('gulp-notify');
plugins.del = require('del');
plugins.browserSync = require('browser-sync');
plugins.reload      = plugins.browserSync.reload;
plugins.livereload 	= require('gulp-livereload');
//console.log(plugins.livereload);
// allows us to grab task functions from folder
function getTask(task) {
	console.log(task)
    return require('./gulp/tasks/' + task)(gulp, plugins, config, errorHandler);
}

// tasks
if (config.sass.isEnabled) {
	gulp.task('styles', getTask('styles'));
};
if (config.js.isEnabled) {
	gulp.task('scripts', getTask('scripts'));
	gulp.task('mocha', getTask('mocha'));
};
if (config.browserSync.isEnabled) {
	gulp.task('browser-sync', getTask('browserSync'));
};
if (config.watch.isEnabled) {
	gulp.task('watch', getTask('watch'));
};
gulp.task('no-fn', function(){ return false; });

// let's goooooo!
gulp.task('default', function(){
	gulp.start(
		(config.sass.isEnabled ? 'styles' : 'no-fn'), 
		(config.js.isEnabled ? 'scripts' : 'no-fn'), 
		(config.js.isEnabled ? 'mocha' : 'no-fn'), 
		(config.browserSync.isEnabled ? 'browser-sync' : 'no-fn'), 
		(config.watch.isEnabled ? 'watch' : 'no-fn')
	);
});