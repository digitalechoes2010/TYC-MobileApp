# TYC-Tap Your Chip
This is the git repository for TYC mobile app.
## Development Components
##### [React Native](http://reactnative.dev)
##### [ESLint](https://eslint.org)
##### [Prettier](https://prettier.io)
##### [Jest](https://jestjs.io)
##### [commitizen](https://www.npmjs.com/package/commitizen)

##Folder structure
This will be project structure followed in the development of the project. 
```
 | __tests__
 | android
 | ios
 | src
    | assets
        |fonts
        |images
    | components
    | config
    | containers
    | lib
    | services
    | store
        | actions
        | actionTypes
        | models
        | reducers
        | sagas
    | utils
```

## Conventions
This project uses best practices for code structuring, implementation and committing.
- This project uses [commitizen](https://www.npmjs.com/package/commitizen) for code committing process. 

## Available Scripts 
If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.
##### Warning
Don't use yarn and npm both to avoid conflicts in node module packages.
#### `npm start`
- Runs your app in development mode.
- Sometime you may need to reset or clear the Ract Native packager's cache. To do so you can pass --reset-cache flag to start scripts:
```
npm start --reset-cache
```
#####OR
```
yarn start --reset-cache
```
#### `npm test`

Runs the [jest](#jesthttpsjestjsio) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. 
Requires an installation of Android build tools (see [React Native docs](http://reactnative.dev/docs/environment-setup) for detailed setup). Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

## `Commit Instructions`
Before starting commit process dont forget to add all the file changes using `git add -A` command. For this you can follow below steps.
- Check all uncommited file by using:
```
git status
```
- Add all uncommited files:
```
git add -A
```

This project uses  [commitizen](#commitizenhttpswwwnpmjscompackagecommitizen) for organizing commits.
When you commit though any of below method, it will ask you for following types of message, choose one which better describe your work.   
```
"chore": {
      "description": "Build process or auxiliary tool changes",
      "emoji": "🤖",
      "value": "chore"
    },
    "ci": {
      "description": "CI related changes",
      "emoji": "🎡",
      "value": "ci"
    },
    "docs": {
      "description": "Documentation only changes",
      "emoji": "✏️",
      "value": "docs"
    },
    "feat": {
      "description": "A new feature",
      "emoji": "🎸",
      "value": "feat"
    },
    "fix": {
      "description": "A bug fix",
      "emoji": "🐛",
      "value": "fix"
    },
    "perf": {
      "description": "A code change that improves performance",
      "emoji": "⚡️",
      "value": "perf"
    },
    "refactor": {
      "description": "A code change that neither fixes a bug or adds a feature",
      "emoji": "💡",
      "value": "refactor"
    },
    "release": {
      "description": "Create a release commit",
      "emoji": "🏹",
      "value": "release"
    },
    "style": {
      "description": "Markup, white-space, formatting, missing semi-colons...",
      "emoji": "💄",
      "value": "style"
    },
    "test": {
      "description": "Adding missing tests",
      "emoji": "💍",
      "value": "test"
    }
```
For making a commit you can use any of following:

#### `git cz`
This can only be used when you have [commitizen](#commitizenhttpswwwnpmjscompackagecommitizen) installed globally
- To install commitizen globaly :
  ```
  npm install -g commitizen
  ```
- After global install you can use `git cz`
  ```
  git cz
  ```    
#### `npx cz`
- We can use this when we have not installed commitizen globaly.
```
npx cz
```
