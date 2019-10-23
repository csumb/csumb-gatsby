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
      if (user.profile.birthdate === request.query.dob) {
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
      return foundUser
    })
    .catch(error => {
      response.send(JSON.stringify({ error: true }))
      response.end()
    })
}
