/* ----------------------
// CONFIG
// Paths are relative to the main 'gulpfile.js'
---------------------- */

config = {

	/* -----------------------
	// BrowserSync
	----------------------- */
	browserSync: {
		isEnabled: true,

		devSiteURL: 'ad.dev',
		cssAutoreload: true,
	},

	/* -----------------------
	// JS build
	// Takes multiple input files (polyfills and main script)
	// Outputs build in same folder
	----------------------- */
	js: {
		isEnabled: true,

		fileNames: [  'script' ], // Array of file names
		path: './assets/js',
		outputName: 'build', // what the final build will be called  (e.g. 'build.bundle.min.js')

		minification: {
			isEnabled: false,
			suffix: 'min'
		},

		browserify: {
			isEnabled: true,
			suffix: 'bundle'
		}
	},

	/* -----------------------
	// SASS build
	// Takes master SASS file
	// Outputs build in given 'output' folder
	----------------------- */
	sass: {
		isEnabled: true,

		masterFileName: 'master',
		path: './assets/sass',
		outputPath: './assets/css',

		minification: {
			isEnabled: false,
			suffix: 'min'
		},

		// misc css settings
		baseFontSize: '16px', // for pixrem
		autoPrefixerBrowsers: ['last 2 version', 'ios 7', 'android 4'], // for auto prefixer
	},

	/* -----------------------
	// Watch
	// Watches files for changes
	----------------------- */
	watch: {
		isEnabled: true,

		watchJs: true,
		watchCss: true
	}
}

module.exports = config;
