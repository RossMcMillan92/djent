var options = require('minimist')(process.argv.slice(2), { default: {
	platform: 'generic'
}});

module.exports = require('./platforms/' + options.platform + '.config.js');
