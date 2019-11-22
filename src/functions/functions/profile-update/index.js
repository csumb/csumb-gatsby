import github from 'octonode'
import checkHash from '../../common/check-hash'
import client from '../../common/okta-client'

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
  client
    .getUser(login)
    .then(oktaUser => {
      const login = oktaUser.profile.login.toLowerCase().split('@')
      const path = `directory/${login[0]}.json`
      repo.contents(path, (error, data) => {
        let userData = {}
        if (!error) {
          const content = Buffer.from(data.content, 'base64')
          userData = JSON.parse(content.toString())
        }
        userData[event.queryStringParameters.field] =
          event.queryStringParameters.value
        if (error) {
          repo.createContents(
            path,
            `Updated ${event.queryStringParameters.field} value for ${
              login[0]
            }`,
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
            `Updated ${event.queryStringParameters.field} value for ${
              login[0]
            }`,
            JSON.stringify(userData),
            data.sha,
            error => {
              if (error) {
                callback(null, {
                  statusCode: 200,
                  body: JSON.stringify({ error: true }),
                })
              }
            }
          )
        }
      })
      return true
    })
    .catch(error => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ error: true }),
      })
    })
}
