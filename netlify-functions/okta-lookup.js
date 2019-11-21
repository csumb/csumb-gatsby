const client = require('./lib/okta-client')

exports.handler = (event, context, callback) => {
  const filter = `profile.firstName eq "${
    event.queryStringParameters.firstName
  }" and profile.lastName eq "${event.queryStringParameters.lastName}"`
  let foundUser = false
  client
    .listUsers({
      filter: filter,
    })
    .each(user => {
      if (user.profile.birthdate === event.queryStringParameters.dob) {
        foundUser = true
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ id: user.profile.login.split('@').shift() }),
        })
        return
      }
    })
    .then(() => {
      if (!foundUser) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ error: true }),
        })
      }
      return foundUser
    })
    .catch(error => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ error: true }),
      })
    })
}
