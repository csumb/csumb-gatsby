const github = require('octonode')
const functions = require('firebase-functions')

const ghClient = github.client(functions.config().github.token)
const repo = ghClient.repo('csumb/web-content')

module.exports = (client, request, response) => {
  client
    .getSession(request.query.token)
    .then(session => {
      client
        .getUser(session.userId)
        .then(oktaUser => {
          const login = oktaUser.profile.login.toLowerCase().split('@')
          repo.contents(
            `/_data/public-directory/${login[0]}.json`,
            (error, data) => {
              if (error) {
                response.send(JSON.stringify({ error: true, type: 'github' }))
                response.end()
                return
              }
              const content = Buffer.from(data.content, 'base64')
              response.send(content.toString())
              response.end()
            }
          )
        })
        .catch(error => {
          response.send(JSON.stringify({ error: true, type: 'github' }))
          response.end()
        })
    })
    .catch(error => {
      response.send(JSON.stringify({ error: true, type: 'okta' }))
      response.end()
    })
}
