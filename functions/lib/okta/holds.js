const checkHash = require('../checkHash')

module.exports = async (client, request, response) => {
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
      if (typeof oktaUser.profile.studentServiceIndicators === 'undefined') {
        response.send(JSON.stringify({ success: false }))
        response.end()
        return
      }
      const holds = []
      oktaUser.profile.studentServiceIndicators.forEach(hold => {
        holds.push(JSON.parse(hold))
      })
      response.write({ success: true, holds: JSON.stringify(holds) })
      response.end()
    })
}
