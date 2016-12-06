const inquirer = require('inquirer');
const constants = require('./constants');
const configDir = constants.configDir;

const exec = require('child_process').execSync;
const cwd = process.cwd();

const env = Object.create(process.env);
const execSpawnOpts = { stdio: 'inherit', env };

const questions = [
    {
        type: 'list',
        name: 'type',
        message: 'Development or build?',
        choices: [
            'Development',
            'Build'
        ]
    },
];

const answerCallback = (answers) => {
    switch (answers.type) {
        case 'Development':
            dev();
        break;
        default:
            build();
        break;
    }
};

const build = () => {
    execSpawnOpts.env.NODE_ENV = 'production';
    // exec(`rm -rf ${cwd}${buildDir}`, execSpawnOpts);
    exec(
        `node ${cwd}/node_modules/webpack/bin/webpack.js --config=${cwd}${configDir}/webpack.build.config.js --color`,
        execSpawnOpts
    );
};

const dev = () => {
    exec(
        `node ${cwd}/node_modules/webpack-dev-server/bin/webpack-dev-server.js --progress --colors --watch --https --config=${cwd}${configDir}/webpack.dev.config.js`,
        execSpawnOpts
    );
};

inquirer.prompt(questions, answerCallback);
