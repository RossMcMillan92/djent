var spawn = require('child_process').spawn;

var cwd = process.cwd();

function build (platform) {
    var env = Object.create(process.env);
    env.NODE_ENV = 'production';

    var buildArgs = [
        '--config=' + cwd + '/config/webpack.build.config.js',
        '--progress',
        '--platform=' + platform
    ];

    spawn('rm', ['-rf', cwd + '/build']).on('close', function () {
      spawn(cwd + '/node_modules/webpack/bin/webpack.js', buildArgs, { stdio: "inherit", env: env });
    })
}

module.exports = build;
