const md5 = require('md5')
const oktaClient = require('@okta/okta-sdk-nodejs')

const salt = process.env.CSUMB_FUNCTIONS_USER_SALT

const checkHash = event => {
  const user =
    typeof event.queryStringParameters.user !== 'undefined'
      ? event.queryStringParameters.user
      : false
  if (!user) {
    return false
  }
  return event.queryStringParameters.token === md5(user + salt)
}

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
    .catch(error => {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ success: false }),
      })
    })
    .then(oktaUser => {
      if (typeof oktaUser.profile.studentServiceIndicators === 'undefined') {
        callback(null, {
          statusCode: 404,
          body: JSON.stringify({ success: false }),
        })
        return
      }
      const holds = []
      oktaUser.profile.studentServiceIndicators.forEach(hold => {
        holds.push(JSON.parse(hold))
      })

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ success: true, holds: holds }),
      })
    })
}
