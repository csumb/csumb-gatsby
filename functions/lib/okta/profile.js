module.exports = (client, request, response) => {
  const allowedFields = [
    'directoryPhone',
    'directoryBuildingCode',
    'campusRoomNumber',
    'profileBio',
    'directoryPhoto',
  ]
  if (allowedFields.indexOf(request.query.field) == -1) {
    return 'Access denied'
  }
  client
    .getUser(request.query.user)
    .catch(error => {
      response.send(JSON.stringify({ success: false }))
      response.end()
      return
    })
    .then(oktaUser => {
      if (oktaUser.profile.authToken != request.query.token) {
        response.end(JSON.stringify({ success: false }))
        response.end()
        return
      }
      oktaUser.profile[request.query.field] = request.query.value
      oktaUser
        .update()
        .catch(error => {})
        .then(result => {
          response.send(JSON.stringify({ success: true }))
          response.end()
        })
    })
}
