const checkHash = require('../checkHash')

module.exports = (client, request, response) => {
  if (!checkHash(request)) {
    response.write(JSON.stringify({ error: true }))
    response.end()
    return
  }
  client
    .listAppLinks(request.query.user)
    .then(links => {
      response.write(JSON.stringify(links))
      return response.end()
    })
    .catch(error => {
      response.write(JSON.stringify({ error: true }))
      response.end()
    })
}
