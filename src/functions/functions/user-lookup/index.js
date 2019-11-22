import client from '../../common/okta-client'

exports.handler = (event, context, callback) => {
  const { firstName, lastName, dob } = event.queryStringParameters
  const filter = `profile.firstName eq "${firstName}" and profile.lastName eq "${lastName}"`
  let foundUser = false
  client
    .listUsers({
      filter: filter,
    })
    .each(user => {
      if (user.profile.birthdate === dob) {
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
