# 🏄‍♀️ CSUMB Gatsby website

## Setup

- Make sure that you have [NodeJS](https://nodejs.org) installed, at least version `8.11` installed.
- Download [Github Desktop](https://desktop.github.com/)
- Make sure git is installed
- In terminal, enter `npm i` to setup and install all the node dependencies.
- Install global grunt by making sure you're in your local admin account, and enter `npm i -g grunt-cli`
- Install global gatsby by making sure you're in your local admin accoutn and enter `npm install --global gatsby-cli`
- Login to Github. Visit the [personal access token](https://github.com/settings/tokens) page and generate a new token.
- Enter a new line in the file `~/.bash_profile` (create it if you don't have it):
  - `export GITHUB_TOKEN='[github username]:[token]';`
- Run `grunt local` to clone test web content to your local machine

## Running the site locally

- Use `gatsby develop` to run gatsby locally
- Use `npm run storybook` to run the Storybook locally
- Use `npm run test` to confirm that all tests pass before making commits
- Use `jest -u` to update snapshots, only needed if tests fail because you changed the layout of a component.

## Environment variables

- CSUMB_HOME_CONTENTFUL_SPACE		
- CSUMB_HOME_CONTENTFUL_TOKEN		
- CSUMB_NAV_CONTENTFUL_SPACE		
- CSUMB_NAV_CONTENTFUL_TOKEN		
- FIREBASE_TOKEN		
- GITHUB_TOKEN


## Special URLs
There are a few special URLs or queries that do special things:

- **?_login** appending the `_login` query to any URL will force the local cache of the user object to flush and re-fetch the user's data from Okta.