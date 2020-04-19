module.exports = {
	// types,
	types: [
		{
			value: ':sparkles: feat',
			name: '✨ A new feature',
		},
		{
			value: ':bug: fix',
			name: '🐛 A bug fix',
		},
		{
			value: ':ambulance: hotfix',
			name: '🚑 Critical hotfix.',
		},
		{
			value: ':memo: docs',
			name: '📝 Documentation only changes',
		},
		{
			value: ':lipstick: style',
			name: '💄 Updating the UI and style files.',
        },
        {
			value: ':construction: WIP',
			name: '🚧 Work in progress',
		},
        {
			value: ':bookmark: release',
			name: '🔖 Releasing / Version tags.',
		},
		{
			value: ':hammer: refactor',
			name: '🔨 A code change that neither fixes a bug nor adds a feature',
		},
		{
			value: ':rocket: deploy',
			name: '🚀 Deploying stuff.',
		},
		{
			value: ':tada: init',
			name: '🎉 Initial commit.',
		},
	],

	scopes: [],

	scopeOverrides: {
		':wrench: docs': [
			{ name: ':wrench: docs' },
			{ name: ':bulb: docs_code' },
		],
	},

	// override the messages, defaults are as follows
	messages: {
		type: "Select the type of change that you're committing:",
		scope: '\nDenote the SCOPE of this change (optional):',
		// used if allowCustomScopes is true
		customScope: 'Denote the SCOPE of this change:',
		subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
		body:
			'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
		breaking: 'List any BREAKING CHANGES (optional):\n',
		footer:
			'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
		confirmCommit:
			'Are you sure you want to proceed with the commit above?',
	},

	allowCustomScopes: false,
	allowBreakingChanges: ['feat', 'fix'],
};