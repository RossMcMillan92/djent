var spawn = require('child_process').spawn;
var cwd = process.cwd();

var build = require('./build.js');
var wizard = require('./ascii.es5.js');

var platformMapping = {
    'Freeview Play': 'freeview',
    'YouView': 'youview',
    'Samsung': 'samsung',
    'Fire TV' : 'firetv',
    'Generic (base)': 'generic'
}

console.log(wizard);

develop();


function develop () {
    var args = [
        '--hot',
        '--config=' + cwd + '/config/webpack.dev.config.js',
    ];
console.log(cwd + '/node_modules/webpack-dev-server/bin/webpack-dev-server.js')
    var child = spawn(cwd + '\node_modules\webpack-dev-server\bin\webpack-dev-server.js', args, { stdio: "inherit" });
}
