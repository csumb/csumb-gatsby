const github = require('octonode')
const functions = require('firebase-functions')

const ghClient = github.client(functions.config().github.token)
const repo = ghClient.repo('csumb/website-data')
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
      const login = oktaUser.profile.login.toLowerCase().split('@')
      repo.contents(`/directory/${login[0]}.json`, (error, data) => {
        if (error) {
          response.send(JSON.stringify({ error: true, type: 'github' }))
          response.end()
          return
        }
        const content = Buffer.from(data.content, 'base64')
        response.send(content.toString())
        response.end()
      })
      return true
    })
    .catch(error => {
      response.send(JSON.stringify({ error: true, type: 'github' }))
      response.end()
    })
}
