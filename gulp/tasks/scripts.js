var source = require('vinyl-source-stream');

module.exports = function(gulp, plugins, config, errorHandler){
	return function(){
		var src =  config.js.fileNames.map(function(file){ return config.js.path + '/' + file + '.js'; })

		// if(config.js.browserify.isEnabled){
		// 	src = src
		// 	.pipe(plugins.babel())
		// 	.on('error', errorHandler)
		// 	.pipe(plugins.rename({suffix: '.' + config.js.browserify.suffix}))
		// 	.pipe(gulp.dest(config.js.path))
		// }

		if(config.js.browserify.isEnabled){
			plugins.browserify(src)
				.transform("babelify",
					{
						presets: ["es2015", "react", "stage-0"],
						plugins: ["external-helpers"]
					}
				)
				.bundle()
				.on('error', errorHandler)
				.pipe(source('bundle.js'))
				.pipe(gulp.dest(config.js.path))
				.pipe(plugins.livereload())
		}

	}
}
