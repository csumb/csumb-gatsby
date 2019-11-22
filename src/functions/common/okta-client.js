import oktaClient from '@okta/okta-sdk-nodejs'

export default new oktaClient.Client({
  orgUrl: 'csumb.okta.com',
  token: process.env.CSUMB_FUNCTIONS_OKTA_KEY,
})
