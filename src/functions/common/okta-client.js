import oktaClient from '@okta/okta-sdk-nodejs'

export default new oktaClient.Client({
  orgUrl: 'https://csumb.okta.com',
  token: process.env.CSUMB_FUNCTIONS_OKTA_KEY,
})
