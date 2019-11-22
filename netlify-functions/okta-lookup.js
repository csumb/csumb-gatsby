const oktaClient = require('@okta/okta-sdk-nodejs')

const client = new oktaClient.Client({
  orgUrl: 'csumb.okta.com',
  token: process.env.CSUMB_FUNCTIONS_OKTA_KEY,
})

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
      console.log(error)
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ error: true }),
      })
    })
}
