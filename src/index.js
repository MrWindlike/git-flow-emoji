const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const EMOJI_DEV_DEPENDENCIES = require("../template/emoji/devDependencies.json");
const CONVENTIONAL_DEV_DEPENDENCIES = require("../template/conventional/devDependencies.json");

const base = process.cwd();
const DEPENDENCIES_MAP = {
  emoji: EMOJI_DEV_DEPENDENCIES,
  conventional: CONVENTIONAL_DEV_DEPENDENCIES,
};

function generatePackageContent(options) {
  const { huskyVersion, isUseChangelog, isUseBump, standard } = options;
  const packagePath = path.resolve(`${base}/package.json`);
  const package = JSON.parse(fs.readFileSync(packagePath));
  const devDependencies = DEPENDENCIES_MAP[standard];
  const scripts = {
    commit: "git cz",
  };
  const husky = {
    hooks: {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    },
  };

  if (huskyVersion === "4.x") {
    devDependencies.husky = "^4.2.5";
  } else if (huskyVersion === "6.x") {
    devDependencies.husky = "^6.0.0";
  }

  if (isUseChangelog) {
    devDependencies["conventional-changelog-cli"] = "^2.0.31";
    devDependencies["@favoloso/conventional-changelog-emoji"] = "^0.10.0";
    scripts.version =
      "conventional-changelog -i CHANGELOG.md -s -a -p @favoloso/emoji && git add CHANGELOG.md";
  }

  if (isUseBump) {
    devDependencies["conventional-recommended-bump"] = "^6.1.0";
    devDependencies["@favoloso/conventional-changelog-emoji"] = "^0.10.0";
    scripts.bump = "conventional-recommended-bump -p @favoloso/emoji";
  }

  return {
    ...package,
    scripts: {
      ...(package.scripts || {}),
      ...scripts,
    },
    devDependencies: {
      ...(package.devDependencies || {}),
      ...devDependencies,
    },
    husky,
  };
}

function copyConfig({ standard, huskyVersion, isUseChangelog, isUseBump }) {
  const filePath = `template/${standard}`;
  const defaultNpmrc = fs.existsSync(path.resolve(`${base}/.npmrc`))
    ? fs.readFileSync(path.resolve(`${base}/.npmrc`))
    : "";
  const npmrc = fs.readFileSync(
    path.resolve(__dirname, `../${filePath}/npmrc`)
  );
  const czrc = fs.readFileSync(path.resolve(__dirname, `../${filePath}/.czrc`));
  const commitlint = fs.readFileSync(
    path.resolve(__dirname, `../${filePath}/commitlint.config.js`)
  );
  const commitMsgHook = fs.readFileSync(
    path.resolve(__dirname, `../${filePath}/.husky/commit-msg`)
  );
  const favolosoEmoji = fs.readFileSync(
    path.resolve(__dirname, `../${filePath}/favolosoEmoji.config.js`)
  );

  if (standard === "emoji") {
    const czConfig = fs.readFileSync(
      path.resolve(__dirname, `../${filePath}/.cz-config.js`)
    );

    fs.writeFileSync(path.resolve(`${base}/.cz-config.js`), czConfig);
  }
  if (isUseChangelog || isUseBump) {
    fs.writeFileSync(
      path.resolve(`${base}/favolosoEmoji.config.js`),
      favolosoEmoji
    );
  }
  fs.writeFileSync(path.resolve(`${base}/.czrc`), czrc);
  fs.writeFileSync(path.resolve(`${base}/commitlint.config.js`), commitlint);
  fs.writeFileSync(
    path.resolve(`${base}/.npmrc`),
    [defaultNpmrc, npmrc].join("\n")
  );

  if (huskyVersion === "6.x") {
    if (!fs.existsSync(path.resolve(`${base}/.husky`))) {
      fs.mkdirSync(path.resolve(`${base}/.husky`));
    }

    fs.writeFileSync(path.resolve(`${base}/.husky/commit-msg`), commitMsgHook);
  }
}

function copyPackage(options) {
  return new Promise((resolve) => {
    const packagePath = path.resolve(`${base}/package.json`);
    const writeStream = fs.createWriteStream(packagePath);
    const package = generatePackageContent(options);

    writeStream.on("finish", function () {
      resolve();
    });

    writeStream.end(JSON.stringify(package, null, 2));
  });
}

function installPackage({ npmClient }) {
  const command = npmClient === "npm" ? "npm install" : "yarn";

  return new Promise((resolve, reject) => {
    console.log(chalk.blue("🚀 Installing packages..."));
    exec(command, function (error, stdout) {
      if (error) {
        console.error(chalk.red("☹️ Install packages fail!"));
        console.error(
          chalk.red(
            `👉  Please manually run \`${command}\` to install the packages.`
          )
        );

        reject(error);
      }

      console.log(chalk.green("🎉  Install Finish!"));
      resolve();
    });
  });
}

function generateChangelog() {
  return new Promise((resolve, reject) => {
    const command = "npx conventional-changelog -i CHANGELOG.md -s -r 0 -p @favoloso/emoji";

    exec(command, function (error) {
      console.log(chalk.blue("🚀 Generating CHANGELOG..."));

      if (error) {
        console.error(chalk.red("☹️ Generate CHANGELOG fail!"));
        console.error(
          chalk.red(
            `👉  Please manually run \`${command}\` to install the packages.`
          )
        );
        fs.writeFileSync(path.resolve(`${base}/CHANGELOG.md`), "");

        reject(error);
        return;
      }

      console.log(chalk.green("🎉 Generate CHANGELOG success!"));
      resolve();
    });
  });
}

function activeHusky() {
  return new Promise((resolve, reject) => {
    const command = "npx husky install";

    exec(command, function (error) {
      if (error) {
        console.error(chalk.red("☹️ Install husky fail!"));
        console.error(
          chalk.red(
            `👉  Please manually run \`${command}\` to install the husky.`
          )
        );

        reject();
        return;
      }

      resolve();
    });
    exec("chmod a+x .husky/commit-msg");
  });
}

module.exports = async function start(options) {
  const { huskyVersion, isUseChangelog, standard, npmClient } = options;

  await copyConfig(options);
  await copyPackage(options);
  await installPackage(options);

  if (isUseChangelog) {
    await generateChangelog();
  }
  if (huskyVersion === "6.x") {
    await activeHusky();
  }

  console.log(chalk.green("✨  Run `npm run commit` to commit."));
};
