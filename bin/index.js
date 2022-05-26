#!/usr/bin/env node

const inquirer = require("inquirer");
const start = require("../src/index");

const [executor, file, command] = process.argv;

switch (command) {
  case "init": {
    inquirer
      .prompt([
        /* Pass your questions in here */
        {
          name: "huskyVersion",
          message: "What version of `husky` do you want to use?",
          type: "list",
          choices: ["4.x", "6.x"],
          default: "6.x",
        },
        {
          name: "isUseChangelog",
          message: "Is use CHANGELOG?",
          type: "confirm",
          default: true,
        },
        {
          name: "isUseBump",
          message: "Is use bump?",
          type: "confirm",
          default: true,
        },
        {
          name: "standard",
          message: "What standard do you want to use?",
          type: "list",
          choices: ["emoji", "conventional"],
          default: "emoji",
        },
        {
          name: "npmClient",
          message: "What is the package manager you want to use?",
          type: "list",
          choices: ["npm", "yarn"],
          default: "npm",
        },
      ])
      .then((answers) => {
        // Use user feedback for... whatever!!
        start(answers);
      })
      .catch((error) => {
        console.log(error);
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
    break;
  }
  default: {
    console.log("👉  Please run `git-flow init`!");
  }
}
