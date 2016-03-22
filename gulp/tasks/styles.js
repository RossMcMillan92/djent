module.exports = function(gulp, plugins, config, errorHandler) {
	return function(){
		var src = config.sass.path + '/' + config.sass.masterFileName + '.scss',
			filterMap = plugins.filter('*map'),
			filterSass = plugins.filter('*css');

		src = plugins.sass( 
			src, 
			{
				style: 'compact',
				sourcemap: true
			}
		)
	    .on('error', errorHandler)
		.pipe(plugins.autoprefixer({
	    	browsers: config.sass.autoPrefixerBrowsers
	    }))
		.pipe(plugins.pixrem(config.sass.baseFontSize, {
			atrules: true
		}))
	    .pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest(config.sass.outputPath))
		
		if(config.sass.minification.isEnabled){
	    	src = src  
			.pipe(plugins.rename({
				suffix: '.' + config.sass.minification.suffix,
				keepSpecialComments: 0
			}))
			.pipe(plugins.minifycss({noAdvanced: true}))
			.pipe(gulp.dest(config.sass.outputPath));
		}

		if(config.browserSync.isEnabled && config.browserSync.cssAutoreload){
			src = src
			.pipe(plugins.reload({stream:true}));
		}
	    
	}

}