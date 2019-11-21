const checkHash = require('./lib/check-hash')
const github = require('octonode')
const ghClient = github.client(process.env.GITHUB_TOKEN)
const repo = ghClient.repo('csumb/website-data')

exports.handler = (event, context, callback) => {
  if (!checkHash(event)) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({ error: true }),
    })
    return
  }
  const login = event.queryStringParameters.user
  const path = `directory/${login}.json`
  const body = JSON.parse(event.body)
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
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({ error: true }),
            })
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
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({ error: true }),
            })
            return
          }

          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ error: false }),
          })
        }
      )
    }
  })
}
