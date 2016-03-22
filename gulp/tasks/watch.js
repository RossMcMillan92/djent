module.exports = function(gulp, plugins, config, errorHandler) {

	return function() {
		plugins.livereload.listen();
		if (config.watch.watchCss) {
			// Watch .scss files
			gulp.watch(config.sass.path + '/**/*.scss', ['styles']);
		}

		if (config.watch.watchJs) {
			// Watch .js files
			gulp.watch([config.js.path + '/**/*.*', 
						'!' + config.js.path + '/' + config.js.outputName + '.' + 'js',
						'!' + config.js.path + '/' + config.js.outputName + '.' + 'bundle.js',
						'!' + config.js.path + '/' + config.js.outputName + '.' + 'bundle.min.js'], ['scripts', 'mocha']);
		};
	}

}