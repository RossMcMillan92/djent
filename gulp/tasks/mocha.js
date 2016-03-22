
var mochaBabel = require("babel-register")({
    presets: "es2015"
})

module.exports = function(gulp, plugins, config, errorHandler) {
	return function() {
		gulp.src(config.js.path + '/tests/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(plugins.mocha())
		.on('error', errorHandler);
	}

}