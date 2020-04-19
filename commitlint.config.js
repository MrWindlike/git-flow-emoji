module.exports = {
    extends: ['@commitlint/config-angular',],
    rules: {
        'type-enum': [2, 'always', [':sparkles:', ':bug:', ':ambulance:', ':lipstick:', ':construction:', ':memo:', ':bookmark:', ':hammer:', ':rocket:', ':tada:',],],
        'subject-case': [0, 'never',],
    },
    parserPreset: {
        parserOpts: {
        headerPattern: /^(:\w*:)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
        headerCorrespondence: ['type', 'scope', 'subject', 'ticket',],
        },
    },
};