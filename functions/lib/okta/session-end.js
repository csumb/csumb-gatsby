module.exports = (client, request, response) => {
  client.endSession(request.query.token).then(session => {
    response.send(JSON.stringify({ done: true }))
    response.end()
  })
}
