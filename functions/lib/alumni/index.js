const checkHash = require('../checkHash')

module.exports = (client, request, response) => {
  if (!checkHash(request)) {
    response.write(JSON.stringify({ error: true }))
    response.end()
    return
  }

  client
    .getUser(request.query.user)
    .catch(error => {
      response.send(JSON.stringify({ success: false }))
      response.end()
    })
    .then(oktaUser => {
      if (
        typeof oktaUser.profile.provisionalServices == 'undefined' ||
        oktaUser.profile.provisionalServices.length == 0
      ) {
        oktaUser.profile.provisionalServices = []
      }
      if (oktaUser.profile.provisionalServices.indexOf('alumni') > -1) {
        return
      }
      oktaUser.profile.provisionalServices.push('alumni')
      oktaUser
        .update()
        .then(result => {
          response.send(JSON.stringify({ success: true }))
          return response.end()
        })
        .catch(error => {})
      return true
    })
    .catch(error => {
      response.send(JSON.stringify({ error: true }))
      response.end()
    })
}
