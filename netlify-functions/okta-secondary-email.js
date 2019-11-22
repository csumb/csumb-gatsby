const checkHash = require('./lib/check-hash')

const oktaClient = require('@okta/okta-sdk-nodejs')

const client = new oktaClient.Client({
  orgUrl: 'csumb.okta.com',
  token: process.env.CSUMB_FUNCTIONS_OKTA_KEY,
})

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    })
    return
  }
  client
    .getUser(event.queryStringParameters.user)
    .then(oktaUser => {
      oktaUser.profile.secondEmail = event.queryStringParameters.email
      return oktaUser
        .update()
        .catch(error => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ error: true }),
          })
        })
        .then(result => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ error: false }),
          })
          return
        })
    })
    .catch(error => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ error: true }),
      })
    })
}
