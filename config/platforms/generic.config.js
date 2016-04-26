var cwd = process.cwd();

module.exports = {
	resolve: {
        root: [
            cwd + '/assets/',
            cwd + '/assets/js/app',
			cwd + '/assets/audio/',
            cwd + '/assets/sass/',
            cwd + '/assets/img/'
        ]
    }
}
