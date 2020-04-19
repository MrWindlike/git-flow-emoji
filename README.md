# Git-Flow-Emoji
> 😃 Just use emoji to commit your message and generate CHANGELOG! 

### 💎 Usage

#### Install
```bash
# install it globally
npm i git-flow-emoji -g
# in your project
git-flow init
```

#### Commit
```bash
git add .
npm run commit
```

#### Release
```bash
npm version <version>
```

### 🔨 Config
You can configure your commit types in `.cz-config.js` file.
```js
module.exports = {
  // ...
  types: [
    {
      value: ':sparkles: feat',
      name: '✨ A new feature',
    },
  ]
};
```

Change the commit message when release.
```bash
# .npmrc
tag-version-prefix="v"
message=":bookmark: release: release %s"
```

👉 More details you can find in this repo: https://github.com/conventional-changelog/conventional-changelog

### ✨ Recommend

There are some recommended types to be used:

#### Feature
When you develop a new feature of project, you better to commit you messages like this:
```bash
# first commit.
# it will be write into CHANGELOG because of type ✨`:sparkles: feat`.
:sparkles: feat: add new feature
# other commits about this feature.
# they will not to be write into CHANGELOG because of type `:construction: WIP`.
:construction: WIP: optimize this feature
:construction: WIP: fix some bugs about this feature
```

#### BUGS
```bash
# it will be write into CHANGELOG because of type 🐛`:bug: fix` or 🚑`:ambulance: hotfix`.
:bug: fix: fix some bugs
:ambulance: hotfix: emergency fix
```

#### UI
```bash
# it will be write into CHANGELOG because of type 💄`:lipstick: style`.
:lipstick: style: change style
```

#### Refactor
```bash
# it will be write into CHANGELOG because of type 🔨`:hammer: refactor style`.
:hammer: refactor: rewrite the code
```

#### Others
You can see the descriptions of types to decide which type to be used.


### Others
If you see some garbled chart instead of emoji when you run `npm run commit`, you could install Windows Terminal in Microsoft store to fix it.

Just enjoy it!
