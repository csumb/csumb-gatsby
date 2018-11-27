# 🏄‍♀️ CSUMB Gatsby website

## Setup

- Make sure that you have [NodeJS](https://nodejs.org) installed, at least version `8.11` installed.
- In terminal, enter `npm i` to setup and install all the node dependencies.
- Install global grunt by making sure you're in your local admin account, and enter `npm i -g grunt-cli`
- Login to Github. Visit the [personal access token](https://github.com/settings/tokens) page and generate a new token.
- Enter a new line in the file `~/.bash_profile` (create it if you don't have it):
  - `export GITHUB_TOKEN='[github username]:[token]';`
- Run `grunt local` to clone test web content to your local machine

## Running the site locally

- Use `gatsby develop` to run gatsby locally
- Use `npm run storybook` to run the Storybook locally
- Use `npm run test` to confirm that all tests pass before making commits
- Use `jest -u` to update snapshots, only needed if tests fail because you changed the layout of a component.
