module.exports = (client, request, response) => {
  client
    .endSession(request.query.token)
    .then(session => {
      response.send(JSON.stringify({ done: true }))
      return response.end()
    })
    .catch(error => {
      response.write(JSON.stringify({ done: false }))
      response.end()
    })
}
