const checkHash = require('../checkHash')

module.exports = (client, request, response) => {
  if (!checkHash(request)) {
    response.write(JSON.stringify({ error: true }))
    response.end()
    return
  }
  client
    .getUser(request.query.user)
    .then(oktaUser => {
      oktaUser.profile.secondEmail = request.query.email
      return oktaUser
        .update()
        .catch(error => {
          response.write(JSON.stringify({ error: true }))
          response.end()
        })
        .then(result => {
          response.write(JSON.stringify({ error: false }))
          return response.end()
        })
    })
    .catch(error => {
      response.write(JSON.stringify({ error: true }))
      response.end()
    })
}
