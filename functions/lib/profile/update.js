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
          const path = `_data/public-directory/${login[0]}.json`
          repo.contents(path, (error, data) => {
            let userData = {}
            if (!error) {
              const content = Buffer.from(data.content, 'base64')
              userData = JSON.parse(content.toString())
            }
            userData[request.query.field] = request.query.value
            if (error) {
              repo.createContents(
                path,
                `Updated ${request.query.field} value for ${login[0]}`,
                JSON.stringify(userData),
                error => {
                  if (error) {
                    response.send(JSON.stringify({ error: true }))
                    response.end()
                  }
                }
              )
            } else {
              repo.updateContents(
                path,
                `Updated ${request.query.field} value for ${login[0]}`,
                JSON.stringify(userData),
                data.sha,
                error => {
                  if (error) {
                    response.send(JSON.stringify({ error: true }))
                    response.end()
                  }
                }
              )
            }
            response.end()
          })
          return true
        })
        .catch(error => {
          response.send(JSON.stringify({ error: true }))
          response.end()
        })
      return true
    })
    .catch(error => {
      response.send(JSON.stringify({ error: true }))
      response.end()
    })
}
