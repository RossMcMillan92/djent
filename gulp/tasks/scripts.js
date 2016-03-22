module.exports = function(gulp, plugins, config, errorHandler){
	return function(){
		var src = gulp.src( config.js.fileNames.map(function(file){ return config.js.path + '/' + file + '.js'; }) );
		
		src = src
		.pipe(plugins.concat( config.js.outputName + '.js' ))
		.pipe(gulp.dest(config.js.path))

		if(config.js.browserify.isEnabled){
			src = src
			.pipe(plugins.browserify({
				insertGlobals : false,
				transform: [plugins.babelify]
			}))
			.on('error', errorHandler)
			.pipe(plugins.rename({suffix: '.' + config.js.browserify.suffix}))
			.pipe(gulp.dest(config.js.path))
		}

		if(config.js.minification.isEnabled){
			src = src
			.pipe(plugins.rename({suffix: '.' + config.js.minification.suffix}))
			.pipe(plugins.uglify())
			.pipe(gulp.dest(config.js.path))
			.pipe((function(){
				console.log('scripts done!');
			})());
		}

		src = src
    		.pipe(plugins.livereload())
	}
}