Update: As of June 2021 this codebase is now retired. The campus has since moved to an all in one CMS solution from Terminal Four.

# 🏄‍♀️ CSUMB website

The CSUMB website is made up of lots of little pieces. This repository includes all the code we use to pull those pieces together into a single, cohesive site using Gatsby.

Need help with your campus website? [Get in touch with web services.](https://csumb.edu/web)

# Technical notes

## Setup

- Make sure that you have [NodeJS](https://nodejs.org) installed. At least version `8.11`, and less than version `11`.
- Download [Github Desktop](https://desktop.github.com/)
- Make sure git is installed
- In terminal, enter `npm i` to setup and install all the node dependencies.
- Install global gatsby by making sure you're in your local admin account and enter `npm install --global gatsby-cli`
- Login to Github. Visit the [personal access token](https://github.com/settings/tokens) page and generate a new token.
- Enter a new line in the file `~/.bash_profile` (create it if you don't have it):
  - `export GITHUB_TOKEN='[github username]:[token]';`

## Running the site locally

- Use `gatsby develop` to run gatsby locally
- Use `npm run storybook` to run the Storybook locally
- Use `npm run test` to confirm that all tests pass before making commits
- Use `jest -u` to update snapshots, only needed if tests fail because you changed the layout of a component.

## Environment variables

The environment variables defined in Netlify are required for builds to work.

## Special URLs

There are a few special URLs or queries that do special things:

- **?\_login** appending the `_login` query to any URL will force the local cache of the user object to flush and re-fetch the user's data from Okta.
