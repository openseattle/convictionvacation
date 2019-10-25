# Conviction Vacation

[![Build Status](https://github.com/openseattle/convictionvacation/workflows/Build/badge.svg)](https://github.com/openseattle/convictionvacation/actions)
[![Deployment Status](https://github.com/openseattle/convictionvacation/workflows/Deployment/badge.svg)](http://openseattle.org/convictionvacation/)

Automating conviction vacation in King County.

## Some Background
One in four Washingtonians have been involved in the state criminal justice system.  Those with a criminal record face
significant barriers to daily life after completing their prison terms, making it harder to find housing and
employment, to gain professional credentials, and to be involved in the life of their community.

Washington state’s New Hope Act makes it easier for people with past criminal records to have their convictions
vacated.  Yet the system is slow and inefficient.  We have identified opportunities to use technology to streamline
this process, and want to explore which of these technological possibilities would make the most sense to prototype,
given user needs and volunteer resources.

## Development Setup
Currently the entire system is a single page application that runs on
[GitHub Pages](https://openseattle.github.com/convictionvacation) and uses React. In this future this may change as we
add more features and develop the system further but this works well for now.

In the project directory, you can run:

1. Ensure you have `nodejs` installed on your machine using whatever system package manager, on Mac using [homebrew](https://brew.sh) run:

    ```
    brew install nodejs
    ```
1. Install project dependecies

    ```
    npm install
    ```
1. Start the app in development mode

    ```
    npm start
    ```
1. Visit [http://localhost:3000](http://localhost:3000) to view it in the browser

[Further React Documentation](docs/react.md)

### Other Commands

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
