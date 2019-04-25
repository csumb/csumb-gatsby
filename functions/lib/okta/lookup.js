module.exports = (client, request, response) => {
  const filter = `profile.firstName eq "${
    request.query.firstName
  }" and profile.lastName eq "${request.query.lastName}"`
  let foundUser = false
  client
    .listUsers({
      filter: filter,
    })
    .each(user => {
      if (user.profile.birthdate == request.query.dob) {
        foundUser = true
        response.send(
          JSON.stringify({ id: user.profile.login.split('@').shift() })
        )
        response.end()
        return
      }
    })
    .then(() => {
      if (!foundUser) {
        response.send(JSON.stringify({ error: true }))
        response.end()
      }
    })
  /*
  okta.user.filter(filter, function(results) {
    var user = {}
    if (!results) {
      response.send(JSON.stringify({ error: 'not found' }))
      response.end()
      return
    }
    _.each(results, function(result) {
      if (result.profile.birthdate == request.query.dob) {
        user = { id: result.profile.login.split('@').shift() }
      }
    })
    response.send(JSON.stringify(user))
    response.end()
  })*/
}
