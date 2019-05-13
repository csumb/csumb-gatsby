module.exports = (client, request, response) => {
  client
    .getSession(request.query.token)
    .then(session => {
      return client
        .getUser(session.userId)
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
    })
    .catch(error => {
      response.write(JSON.stringify({ error: true }))
      response.end()
    })
}
