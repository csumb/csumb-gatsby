const checkHash = require('./lib/check-hash')
const client = require('./lib/okta-client')

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    })
    return
  }
  client
    .getUser(request.query.user)
    .then(oktaUser => {
      oktaUser.profile.secondEmail = request.query.email
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
