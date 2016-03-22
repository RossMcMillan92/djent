module.exports = function(gulp, plugins, config, errorHandler) {
	return function() {
	    plugins.browserSync({
	        // proxy: config.browserSync.devSiteURL,
	        // open: false
	    });
	}
}