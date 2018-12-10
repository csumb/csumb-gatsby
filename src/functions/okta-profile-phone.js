const okta = require('@okta/okta-sdk-nodejs')

var client = new okta.Client({
  orgUrl: process.env.OKTA_CLIENT_ORGURL,
  token: process.env.OKTA_CLIENT_TOKEN,
})

exports.handler = function(event, context, callback) {
  client
    .getUser(event.queryStringParameters.user)
    .catch(error => {
      console.log(error)
    })
    .then(oktaUser => {
      callback(null, {
        statusCode: 200,
        body: oktaUser.id,
      })
      oktaUser.profile.directoryPhone = event.queryStringParameters.phone
      oktaUser
        .update()
        .catch(error => {
          console.log({
            user: user.id,
            action: `error.okta.update`,
            message: error.toString(),
          })
        })
        .then(result => {
          return result
        })
      return
    })
}
