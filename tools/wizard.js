const inquirer = require('inquirer');
const constants = require('./constants');
const configDir = constants.configDir;

const exec = require('child_process').execSync;
const cwd = process.cwd();

const env = Object.create(process.env);
const execSpawnOpts = { stdio: 'inherit', env };

const platformMap = {
    Phonegap: 'phonegap',
    'Generic (base)': 'generic'
};

const questions = [
    {
        type: 'list',
        name: 'platform',
        message: 'Which platform?',
        choices: [
            'Generic (base)',
            'Phonegap'
        ]
    },
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
            dev(platformMap[answers.platform]);
        break;
        default:
            build(platformMap[answers.platform]);
        break;
    }
};

const build = (platform) => {
    execSpawnOpts.env.NODE_ENV = 'production';
    const args = [
        '--colors',
        `--config=${cwd}${configDir}/webpack.build.config.js`,
        `--platform=${platform}`,
    ];
    exec(
        `node ${cwd}/node_modules/webpack/bin/webpack.js ${args.join(' ')}`,
        execSpawnOpts
    );
};

const dev = (platform) => {
    const args = [
        '--progress',
        '--colors',
        '--watch',
        `--config=${cwd}${configDir}/webpack.dev.config.js`,
        `--platform=${platform}`,
    ];
    exec(
        `node ${cwd}/node_modules/webpack-dev-server/bin/webpack-dev-server.js ${args.join(' ')}`,
        execSpawnOpts
    );
};

inquirer.prompt(questions, answerCallback);
