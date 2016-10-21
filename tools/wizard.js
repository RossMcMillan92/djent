const inquirer = require('inquirer');
const build = require('./build.js');

const questions = [
    {
        type: "list",
        name: "type",
        message: "Development or build?",
        choices: [
            "Development",
            "Build"
        ]
    },
];
const answerCallback = (answers) => {
    switch (answers.type) {
        case 'Development':
            // develop(platformMapping[answers.platform]);
        break;
        case 'Build':
            build();
        break;
    }
};

inquirer.prompt(questions, answerCallback);
