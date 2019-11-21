const oktaClient = require('@okta/okta-sdk-nodejs')

module.exports = new oktaClient.Client({
  orgUrl: 'csumb.okta.com',
  token: process.env.CSUMB_FUNCTIONS_OKTA_KEY,
})
