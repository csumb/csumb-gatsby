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
  const login = request.query.user
  const path = `directory/${login[0]}.json`
  const body = JSON.parse(request.body.text)
  repo.contents(path, (error, data) => {
    let userData = {}
    if (!error) {
      const content = Buffer.from(data.content, 'base64')
      userData = JSON.parse(content.toString())
    }
    userData.biography = body.body
    if (error) {
      repo.createContents(
        path,
        `Updated biography for ${login[0]}`,
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
}
