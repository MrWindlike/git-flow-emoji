#!/usr/bin/env node

const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const [executor, file, command] = process.argv;

switch(command) {
    case 'init': {
        const base = process.cwd();
        const packagePath = path.resolve(`${base}/package.json`);
        const package = JSON.parse(fs.readFileSync(packagePath));
        const defaultNpmrc = fs.existsSync(path.resolve(`${base}/.npmrc`)) ? fs.readFileSync(path.resolve(`${base}/.npmrc`)) : '';
        const npmrc = fs.readFileSync(path.resolve(__dirname, '../npmrc'));
        const czConfig = fs.readFileSync(path.resolve(__dirname, '../.cz-config.js'));
        const czrc = fs.readFileSync(path.resolve(__dirname, '../.czrc'));
        const commitlint = fs.readFileSync(path.resolve(__dirname, '../commitlint.config.js'));
        const scripts = {
            commit: 'git cz',
            version: 'conventional-changelog -i CHANGELOG.md -s -p conventional-changelog-emoji && git add CHANGELOG.md',
            log: 'conventional-changelog -i CHANGELOG.md -s -r 0 -p conventional-changelog-emoji'
        };
        const husky = {
            hooks: {
                'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
            }     
        };
        const devDependencies = {
            "@commitlint/cli": "^8.3.5",
            "@commitlint/config-angular": "^8.3.4",
            "commitizen": "^4.0.4",
            "conventional-changelog": "^3.1.18",
            "conventional-changelog-cli": "^2.0.31",
            "conventional-changelog-emoji": "^0.3.3",
            "cz-customizable": "^6.2.0",
            "husky": "^4.2.5"
        };
        const writeStream = fs.createWriteStream(packagePath);
        
        writeStream.on('finish', function() {
            console.log(chalk.blue('🚀 Installing packages...'));
            exec('npm i', function(error, stdout) {
                if(error) {
                    console.error('☹️ Install packages fail!');
                    console.error('👉 Please manually run `npm install` to install the packages.');

                    return ;
                }
                exec('conventional-changelog -i CHANGELOG.md -w -r 0', function(error) {
                    if(error) {
                        fs.writeFileSync(path.resolve(`${base}/CHANGELOG.md`), '');
                    }
                });
                console.log(chalk.green('🎉 Install Finish!'));
                console.log(chalk.green('✨ Run `npm run commit` to commit.'));
                console.log(chalk.green('✨ Run `npm version <version>` to release.'));
            });
        });
        
        writeStream.end(JSON.stringify({
            ...package, 
            scripts: {
                ...package.scripts,
                ...scripts,
            },
            devDependencies: {
                ...package.devDependencies,
                ...devDependencies
            },
            husky
        }));
        fs.writeFileSync(path.resolve(`${base}/.cz-config.js`), czConfig);
        fs.writeFileSync(path.resolve(`${base}/.czrc`), czrc);
        fs.writeFileSync(path.resolve(`${base}/commitlint.config.js`), commitlint);
        fs.writeFileSync(path.resolve(`${base}/.npmrc`), [defaultNpmrc, npmrc].join('\n'));

        break;
    }
    default: {
        console.log('👉  Please run `git-flow init`!')
    }
}
