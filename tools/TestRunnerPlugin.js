var spawn = require('child_process').spawn;

function TestRunnerPlugin () {}
TestRunnerPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {
        spawn(
            process.cwd() + '/node_modules/mocha/bin/mocha',
            ['--require=source-map-support/register', '__built_tests__'],
            { stdio: "inherit" }
        );
    });
}

module.exports = TestRunnerPlugin;
