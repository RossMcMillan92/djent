const constants = require('./constants');
const buildDir = constants.buildDir;
const configDir = constants.configDir;

const exec = require('child_process').execSync;
const cwd = process.cwd();

const env = Object.create(process.env);
const execSpawnOpts = { stdio: "inherit", env: env };

env.NODE_ENV = 'production';

const build = () => {
    // Remove build directory
    exec(`rm -rf ${cwd}${buildDir}`, execSpawnOpts);

    // Run webpack build
    exec(
        `${cwd}/node_modules/webpack/bin/webpack.js --config=${cwd}${configDir}/webpack.build.config.js --color`,
        execSpawnOpts
    );
}

module.exports = build;
