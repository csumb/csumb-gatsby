const okta = require('@okta/okta-sdk-nodejs')

var client = new okta.Client({
  orgUrl: process.env.OKTA_CLIENT_ORGURL,
  token: process.env.OKTA_CLIENT_TOKEN,
})

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  })
}
